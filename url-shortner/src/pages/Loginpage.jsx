import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'

import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseAuthContext } from '../contexts/FirebaseAuthContext';

export const Loginpage = () => {

  const navigate=useNavigate();

  const {loginUserWithEmailAndPassword,logedInUser}=useContext(FirebaseAuthContext)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');



  const handleLogin=async(e)=>{


    e.preventDefault();
  
const user=await loginUserWithEmailAndPassword(email,password)


  }

  useEffect(()=>{
    if(logedInUser){
      navigate('/')
    }
  })

  return (
  <div  className="w-full min-h-[100vh] flex items-center justify-center ">


<div className=" sm:px-4  flex flex-col justify-center items-center border-2 px-5 py-5 border-[var(--primary-color)]  rounded-md shadow-lg ">
    <ToastContainer/>
   <h1 className='text-6xl font-bold primary-gradient-text'>Quicklink</h1>
    <p className="text-lg mt-2">Login to your account</p>
    
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-[500px] max-w-[80vw] my-5">
    
    <input required onChange={(e)=>setEmail(e.target.value)} className="px-4 py-3 border-2  rounded-md outline-none" name="email" type="email" placeholder="Enter your email address"/>
    <input required onChange={(e)=>setPassword(e.target.value)} className="px-4 py-3 border-2 rounded-md outline-none" name="password" type="password" placeholder="Enter your password" />
    <button className="px-4 py-3 border-2 rounded-md bg-[var(--primary-color)] text-white hover:bg-[var(--btn-hover-color)] transition-all gradient-background"  type="submit">Login</button>
    </form>
    <p>Don't  have an account ? <NavLink to={'/register'} className="cursor-pointer hover:underline text-[var(--primary-color)] font-semibold">Register</NavLink></p>

       </div>


  </div>
  )
}
