import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './home'
import Page from './page'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </>
  )
}

export default App
