import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Page = () => {
    const location = useLocation()
    const urldata = location.state?.urlval
    const [loading, setLoading] = useState(true);
    const [shorturl, setShorturl] = useState(null)
    const [errormsg, seterrormsg] = useState(null)
    console.log(urldata)
    useEffect(() => {
        const urlshorterner = async () => {
            if (!urldata) {
                setLoading(false)
                return
            }
            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: urldata })
                })
                const data = await response.json()
                setShorturl(data)
                console.log(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                seterrormsg("Something Went Wrong ... Try again later")
            }
        }
        urlshorterner()


    }, [urldata])

    const copytoclip = async () => {
        await navigator.clipboard.writeText(`shortify.onrender.com/${shorturl.shorturl}`)
    }
    const tothelink=()=>{
        window.location.href=`https://shortify.onrender.com/${shorturl.shorturl}`
    }
    const tothehome=()=>{
        window.location.href=`https://shortify.onrender.com`
    }

    if (loading) {
        return <h3>Loading your results...</h3>
    }
    if (errormsg) {
        return <h3>{errormsg}</h3>
    }
    return (
        <>
            <header>
                <div className="logo"><img src="/images/logo.jpg" alt="logo" /></div>
                <div className="name">Shortify</div>
            </header>
            <div className="viewhere">
                <div className="done">
                    <span className="material-symbols-outlined dicon">
                        task_alt
                    </span>
                    <div className="dnetext">URL Shortend Successfully !</div>
                </div>
                <div className="og" id='og' >
                    Original URL : {urldata}
                </div>
                <div className="short">
                    <div className="stext">Your Shortened URL : </div>
                    <div className="send">
                        <div className="sdata">shortify.onrender.com/{shorturl.shorturl}</div>
                        <div className="copy" onClick={copytoclip}>
                            <span className="material-symbols-outlined cpy">
                                content_copy
                            </span>
                        </div>
                    </div>
                    <div className="btnhere">
                        <button className='b1' onClick={tothelink}>Go to Link</button>
                        <button className='b2' onClick={tothehome}>Shorten Another URL</button>
                    </div>
                </div>

                {/* {shorturl && <h1>{shorturl?.shorturl}</h1>} */}
            </div>


        </>
    )
}

export default Page