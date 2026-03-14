import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const btnsubmit=()=>{
        // navigate(`/page?link=${userInput}`)
        navigate(`/page`,{state:{urlval:userInput}})
    }
    return (
        <>
            <header>
                <div className="logo"><img src="/images/logo.jpg" alt="logo" /></div>
                <div className="name">Shortify</div>
            </header>
                <div className="main">
                    <div className="mainhed">Shorten Your Long URLs</div>
                    <div className="maindesc">Quickly convert any URL to a short link</div>
                </div>

                <div className="cont">
                    <input type="text" placeholder='Paste your long URL here' id="linkinp" className='linkinp' onChange={(e)=> setUserInput(e.target.value)} autoComplete='off'/>
                    <button className='submit' id='submit' onClick={btnsubmit} >Shorten Now!</button>
                </div>
            <footer>
                <div className="utility">
                    <div className="uimg1"><img src="/images/timer.png" alt="" /></div>
                    <div className="uhead">Fast</div>
                    <div className="udesc">Instant link shortening</div>
                </div>
                <div className="utility">
                    <div className="uimg2"><img src="/images/lock.png" alt="" /></div>
                    <div className="uhead">Private</div>
                    <div className="udesc">No account required</div>
                </div>
                <div className="utility">
                    <div className="uimg3"><img src="/images/copy.png" alt="" /></div>
                    <div className="uhead">Easy</div>
                    <div className="udesc">Copy, use and share</div>
                </div>
            </footer>
        </>
    )
}

export default Home