import {  useEffect, useRef, useState } from 'react'

import './App.css'
import { URLShortner } from './components/URLShortner/URLShortner'
import { NavBar } from './components/Navbar/NavBar'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
 
  const SERVER_CONNECTION_LINK=import.meta.env.VITE_SERVER_CONNECTION_LINK




useEffect(()=>{
  window.scrollTo(0,0)
})



  return (

<>
<ToastContainer/>
<NavBar/>
<URLShortner/>
<Features/>
<Footer/>
</>

  )
}

export default App
