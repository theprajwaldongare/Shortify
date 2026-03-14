import express, { text } from 'express'
import 'dotenv/config';
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// mongoose.connect("mongodb://localhost:27017/shortify")
mongoose.connect(process.env.MONGODBURL)
const urlSchema = new mongoose.Schema({
    longurl: {
        type: String,
        required: true,
    },
    shorturl: {
        type: String,
        required: true
    }
})
const Url = mongoose.model("Url", urlSchema)

function randomgen() {
    let shortstr = ""
    while (shortstr.length < 5) {
        // shortstr = shortstr + String.fromCharCode(96 + Math.floor(Math.random() * 26 + 1))
        let weget = Math.floor(Math.random() * 62)
        if (weget <= 9) {
            shortstr = shortstr + String(weget)
        }
        else if (weget > 9 && weget <= 35) {
            shortstr = shortstr + String.fromCharCode(87 + weget)
        }
        else {
            shortstr = shortstr + String.fromCharCode(29 + weget)
        }
    }
    return shortstr

}

// app.get('/', (req, res) => {
//     // console.log(req.body)
// })
// res.sendFile(__dirname + 'index.html')
// app.get("/generate", (req, res) => {
//     res.send({ "thanks": "truehere" })
// })
app.post("/api/generate", async (req, res) => {
    const longurlhere = req.body.query
    let shorturlhere = randomgen()
    let flagshort = true
    // res.send({ "thanks": "truehere" })
    try {
        const exists = await Url.findOne({ longurl: longurlhere })
        if (exists) {
            return res.json({
                "longurl": exists.longurl,
                "shorturl": exists.shorturl
            })
        }
        while (flagshort) {
            const shortexist = await Url.findOne({ shorturl: shorturlhere })
            if (shortexist) {
                shorturlhere = randomgen()
            }
            else {
                flagshort = false
            }

        }
        const realdata = { "longurl": longurlhere, "shorturl": shorturlhere }
        const url = new Url(realdata)
        await url.save()
        console.log(realdata)
        res.json(realdata)

    } catch (error) {
        res.json({ "longurl": longurlhere, "shorturl": error })
    }
})

app.get("/:shortvalidate", async (req, res,next) => {
    // example :: http://localhost:3000/5uDkq
    const shortvalidate = req.params.shortvalidate
    if (shortvalidate.length !== 5) {
        return next();
    }
    const sendtodb = await Url.findOne({ shorturl: shortvalidate })
    if (sendtodb) {
        let longfromdb = sendtodb.longurl
        res.redirect(longfromdb)
    }
})









app.use((req, res) => {
    // res.sendFile(__dirname + 'index.html')
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//geminii.. is { "longurl": longurlhere, "shorturl": shorturlhere },and this { longurl: longurlhere, shorturl: shorturlhere } differs??