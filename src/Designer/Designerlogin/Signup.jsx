import React, { useState } from 'react'
import loginbg from './loginImage/loginbg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Signup() {
    const[switchPage,switchFun] = useState(false)
  return (
    <div style={{zIndex:'99999',backdropFilter:'blur(0.1vw)'}} className='login w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(0,0,0,0.4)] fixed relative'>
        <div className='w-[60vw] h-[34vw] relative overflow-hidden bg-[white]'>
<div className="login w-[150%] h-[100%] flex absolute left-[-50%] " >
<div className="loginDiv flex w-[50%] flex-col px-[5vw] py-[3vw] bg-[white]">
        <h2 className='text-[0.7vw] font-[500]'>Interior Designer System</h2>
        <p className='text-[2vw] font-[600]'>Log in to your account</p>
        <div className="loginUserData flex flex-col">
            <label htmlFor="email" className='mt-[1vw] text-[1vw]'>Email</label>
            <input type="text" className='border px-[1vw] py-[0.9vw] mt-[0.2vw] rounded-[0.4vw] h-[55%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="password" className='mt-[1vw] text-[1vw]'>Password</label>
            <input type="text" className='border px-[1vw] py-[0.9vw] mt-[0.2vw] rounded-[0.4vw] h-[55%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <button style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}} className='mt-[2vw] bg-[#065ad7] px-[2vw] py-[0.8vw] text-white rounded-[0.8vw] text-[1vw] font-[500]'>Login</button>
        </div>
        <h3 className='text-[0.8vw] text-center mt-[2vw]'>Don't have an account? <span className='text-[#065ad7] font-[600]'>Create an account</span></h3>
    </div>
    <div className="imageDiv flex w-[60%] bg-[black]">
        <img src={loginbg} alt="" className='w-[100%] h-[100%] object-cover opacity-[0.75]'  />        
    </div>
    <div className="loginDiv flex w-[50%] flex-col px-[5vw] py-[2vw] bg-[white]">
        <h2 className='text-[0.7vw] font-[500]'>Interior Designer System</h2>
        <p className='text-[2vw] font-[600]'>Sign Up</p>
        <div className="loginUserData flex flex-col">
            <label htmlFor="email" className='mt-[1vw] text-[1vw]'>Username</label>
            <input type="text" className='border px-[1vw] py-[0.7vw] mt-[0.1vw] rounded-[0.4vw] h-[30%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="email" className='mt-[1vw] text-[1vw]'>Email</label>
            <input type="text" className='border px-[1vw] py-[0.7vw] mt-[0.1vw] rounded-[0.4vw] h-[30%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="password" className='mt-[1vw] text-[1vw]'>Password</label>
            <input type="text" className='border px-[1vw] py-[0.7vw] mt-[0.1vw] rounded-[0.4vw] h-[30%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="password" className='mt-[1vw] text-[1vw]'>Address</label>
            <input type="text" className='border px-[1vw] py-[0.7vw] mt-[0.1vw] rounded-[0.4vw] h-[30%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <button style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}} className='mt-[1vw] bg-[#065ad7] px-[2vw] py-[0.6vw] text-white rounded-[0.8vw] text-[1vw] font-[500]'>Sign Up</button>
        </div>
        <h3 className='text-[0.8vw] text-center mt-[0.5vw]'>Already have an account? <span className='text-[#065ad7] font-[600]'>Login</span></h3>
    </div>

</div>
</div>
    </div>
  )
}
