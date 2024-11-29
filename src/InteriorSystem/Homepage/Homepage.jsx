import React, { useEffect, useState } from 'react'
import homeBG from './HomepageImage/homepage.jpg'
import'./Homepagecss.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
export default function Homepage() {

  
  

  return (
    <div className='homepage w-[100vw] h-[100vh] px-[4vw]  flex '>
<div className="homeContent text-[white] px-[2vw] w-[68vw] h-[20vw] ">
  <p className='text-[6vw] text-white font-[500]'>Interior Designer <br />System</p>
  <h1 className='text-[2vw] font-[100]'>Transforming Spaces, Elevating Lives</h1>
  <button className='border px-[3vw] py-[1.2vw] text-[0.7vw] rounded-[100vw]'>Explore More</button>
  </div>
  <div className="scrollDownText w-[20vw] h-[16vw]">
<p>scroll down scroll down </p>
  </div>


    </div>
  )
}
