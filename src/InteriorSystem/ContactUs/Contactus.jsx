
import { faFacebookF, faInstagram, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Contactus() {
  return (
    <div className='w-[100vw] h-[25vw] bg-[#f5f5f5] text-[black] flex justify-center items-center'>
        <div className="contactUsContent w-[80%] h-[80%] flex justify-center">


<div className="flex flex-col conatctDetails3 basis-[25%] py-[2vw] px-[2.4vw] text-[2vw] font-[500] text-nowrap">
<h3 className='mb-[1vw]'>Explore Designs</h3>
    <ul className='flex gap-[1vw] text-[2vw] flex-col'>
        <li className='text-[1vw] font-[400]'>Asthetic</li>
        <li className='text-[1vw] font-[400]'>Wooden</li>
        <li className='text-[1vw] font-[400]'>Modern</li>
        <li className='text-[1vw] font-[400]'>Tradditional</li>
        
    </ul>
</div>
<div className="flex flex-col conatctDetails3 basis-[25%] py-[2vw] px-[2.4vw] text-[2vw] font-[500] text-nowrap">
<h3 className='mb-[1vw]'>In-Person-Location</h3>
    <ul className='flex gap-[1vw] text-[2vw] flex-col'>
        <li className='text-[1vw] font-[400]'>Kalanki</li>
        <li className='text-[1vw] font-[400]'>Swayambhu</li>
        <li className='text-[1vw] font-[400]'>Pokhara</li>
        
    </ul>
</div>
<div className="conatctDetails2 basis-[25%] py-[2vw] px-[2.4vw] text-[2vw] font-[500]">
<h3 className='mb-[1vw]'>Contact Us</h3>
    <ul className='flex gap-[2vw] text-[2vw'>
        <li className='text-[1vw] font-[400]'>interiordesignersystem@gmail.com</li>
        
    </ul>
</div>

<div className="conatctDetails4  basis-[25%] py-[2vw] px-[2.4vw] text-[2vw] font-[500]">
    <h3 className='mb-[0.4vw]'>Follow Us</h3>
    <ul className='flex gap-[2vw] text-[2vw'>
        <li><FontAwesomeIcon icon={faFacebookF}/></li>
        <li><FontAwesomeIcon icon={faInstagram}/></li>
        <li><FontAwesomeIcon icon={faXTwitter}/></li>
    </ul>
</div>
        </div>
    </div>
  )
}
