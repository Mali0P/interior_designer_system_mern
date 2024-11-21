import React, { useState } from 'react'
import aboutusimg from './AboutusImage/aboutusimage.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './AboutUscss.css'
export default function AboutUs() {

  let moveAbout = (e)=>{
    let rect = e.target.getBoundingClientRect(); // Get the element's position
    let offsetX = e.clientX - rect.left; // X offset within the element
    let offsetY = e.clientY - rect.top;
    gsap.to('.aboutusHover',{
      x:offsetX,
      y:offsetY,
      opacity:1,
      scaleX:1,
      scaleY:1,
          transition:'none'
    })

  }

  let mouseAboutLeave = (e)=>{
    let rect = e.target.getBoundingClientRect(); // Get the element's position
    let offsetX = e.clientX - rect.left; // X offset within the element
    let offsetY = e.clientY - rect.top;
    gsap.to('.aboutusHover',{
      x:offsetX,
      y:offsetY,
     scaleX:0,
     scaleY:0,
     transition:'none'
    })

  }
 

  return (
    <div className='aboutUs w-[100vw] h-[48vw] z-2 flex justify-center items-center relative'>
        <div className="aboutUsDetails w-[80%] h-[80%] flex">
            <div style={{zIndex:30}} className="leftData px-[4vw] py-[3vw] basis-[50%]  text-black flex flex-col relative">
              <div className="transparentDivAboutUs absolute w-[80%] h-[80%] z-22" onMouseMove={(e)=>{moveAbout(e)}} onMouseLeave={(e=>{mouseAboutLeave(e)})}>

              </div>
<div style={{scale:0,zIndex:2}} className="aboutusHover absolute w-[10vw] h-[10vw] bg-[#0da24e] rounded-[100vw]">
<p className='text-[white] t-[2vw] absolute text-[0.9vw]' style={{left:'18%',top:'65%'}}>About Us</p>
<FontAwesomeIcon icon={faArrowRight} className='absolute left-[70%] top-[20%] rotate-[-40deg] text-[white]'/>


</div>
<h2 className='mb-[1.4vw] text-[4.5vw] font-[500]'>About us</h2>
<p className='leading-[1.9vw] text-[1.4vw] text-left'>Welcome to Mali0P, your one-stop platform for innovative interior design solutions. We empower users to explore stunning design inspirations, customize spaces, and connect with professional designers to bring their vision to life.</p>
           <button className='mt-[2vw] bg-[white] border px-[2vw] py-[1vw] rounded-[100vw]  w-[35%] bg-[rgb(0,0,0,0.9)] text-black text-[0.8vw] font-[500]' style={{boxShadow:'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px'}}>Explore Designs</button>
            </div>
            <div className="rightData basis-[50%] rounded-[2vw]" style={{backgroundImage:`url(${aboutusimg})`,backgroundSize:'cover',backgroundPosition:'center'}} ></div>
        </div>
    </div>
  )
}
