import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function Navbar() {

  window.addEventListener('wheel',(position)=>{
    if (position.pageY<350) {
      let icon = document.querySelector('.navbar');
      if (icon) {
        icon.style.backgroundColor = 'white';
        icon.style.transition = 'ease 0.5s'; 
      }
    }
    else{
      let icon = document.querySelector('.navbar');
      if (icon) { 
        icon.style.backgroundColor = 'rgb(255,255,255)';
        icon.style.transition = 'ease 0.8s'; 
        
      }
    }
    
    
    
    
      })
  return (
    <div style={{backdropFilter:'blur(1vw)'}} className='navbar w-[100vw] h-[4.2vw] top-0 text-[] bg-[white] fixed z-20 px-[6vw] flex justify-between items-center '>
      <nav className='flex justify-center items-center flex justify-between items-center w-[100%]'>
        <h1 className='text-[1.4vw] font-[600]'>IDS</h1>
        <ul className='flex gap-[1vw]  text-[1vw] font-[500] justify-center items-center'>
          <li>Designs</li>
          <li>Designers</li>
          <li>About Us</li>
          <li>Customized</li>
        </ul>
        <button style={{backdropFilter:'blur(2vw)'}} className='border z-10 border-[black] text-[0.8vw] rounded-[100vw] px-[1.5vw] py-[0.7vw] bg-[white] text-[black] font-[600] '>login/signup<FontAwesomeIcon icon={faRightFromBracket} className='ml-[1vw]'/></button>
      </nav>
    </div>
  )
}
