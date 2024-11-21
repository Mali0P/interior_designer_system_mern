import React, { useState } from 'react'
import homeBG from './HomepageImage/homepage.jpg'
import'./Homepagecss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
export default function Homepage() {
  const[pageY,pageYFun] = useState(null)
  const[wheelArrow,wheelArrowFun] = useState(null)
  window.addEventListener('wheel',(position)=>{

if (position.pageY>500) {
  let icon = document.querySelector('.icon'); // Use querySelector for a single element
  if (icon) { // Ensure the element exists
    icon.style.transform = 'rotate(180deg)';
    icon.style.transition = 'transform 0.5s'; // Smooth rotation
  }
}
else{
  let icon = document.querySelector('.icon'); // Use querySelector for a single element
  if (icon) { // Ensure the element exists
    icon.style.transform = 'rotate(0deg)';
    icon.style.transition = 'transform 0.5s'; // Smooth rotation
  }
}




  })
  return (
    <div className='homepage w-[100vw] h-[100vh] px-[4vw]  flex mt-[4.2vw] '>
<div className="homeContent text-[white] px-[2vw] w-[68vw] h-[20vw] ">
  <p className='text-[6vw] text-white font-[500]'>Interior Designer <br />System</p>
  <h1 className='text-[2vw] font-[100]'>Transforming Spaces, Elevating Lives</h1>
  <button className='border px-[3vw] py-[1.2vw] text-[0.7vw] rounded-[100vw]'>Explore More</button>
  </div>
  <div className="scrollDownIcon w-[30vw] h-[13vw]">
 <FontAwesomeIcon icon={faArrowDown} className='icon fixed'/>
  </div>


    </div>
  )
}
