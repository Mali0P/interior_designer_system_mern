import React from 'react'
import loginbg from './loginImage/loginbg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Login() {
    
  return (
    <div style={{zIndex:'99999',backdropFilter:'blur(0.1vw)'}} className='login w-[100vw] h-[100vh] flex justify-center items-center bg-[rgb(0,0,0,0.4)] fixed'>
        <div className='w-[62vw] h-[34vw] overflow-hidden relative'>
<div className="w-[95vw] h-[34vw] bg-[white] flex absolute left-[-50%]">
    <div className="loginDiv flex basis-[50%] flex-col px-[5vw] py-[3vw]">
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
    <div className="imageDiv flex basis-[50%] relative bg-[black]">
        <img src={loginbg} alt="" className='w-[100%] h-[100%] object-cover opacity-[0.75]'  />
        <FontAwesomeIcon icon={faXmark} className='text-[white] text-[2vw] absolute left-[4%] top-[4%]'/>
        
    </div>

    <div className="loginDiv flex basis-[50%] flex-col px-[5vw] py-[2vw]">
        <h2 className='text-[0.7vw] font-[500]'>Interior Designer System</h2>
        <p className='text-[2vw] font-[600]'>Sign Up</p>
        <div className="loginUserData flex flex-col">
            <label htmlFor="email" className='mt-[1vw] text-[1vw]'>Username</label>
            <input type="text" className='border px-[1vw] py-[0.8vw] mt-[0.2vw] rounded-[0.4vw] h-[55%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="email" className='mt-[1vw] text-[1vw]'>Email</label>
            <input type="text" className='border px-[1vw] py-[0.8vw] mt-[0.2vw] rounded-[0.4vw] h-[55%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <label htmlFor="password" className='mt-[1vw] text-[1vw]'>Password</label>
            <input type="text" className='border px-[1vw] py-[0.8vw] mt-[0.2vw] rounded-[0.4vw] h-[55%]' style={{boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'}}/>
            <button style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}} className='mt-[2vw] bg-[#065ad7] px-[2vw] py-[0.8vw] text-white rounded-[0.8vw] text-[1vw] font-[500]'>Sign Up</button>
        </div>
        <h3 className='text-[0.8vw] text-center mt-[2vw]'>Already have an account? <span className='text-[#065ad7] font-[600]'>Login</span></h3>
    </div>
</div>
</div>
    </div>
  )
}
