import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Header from './components/Header'
import FooterCom from './components/FooterCom'





 
export default function App() {
  return (
    <BrowserRouter>
      <Header />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <FooterCom /> 
  
    </BrowserRouter>
  )
}

