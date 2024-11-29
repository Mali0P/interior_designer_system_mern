
import React, { useEffect, useState } from 'react'
import img1 from './DesignerImg/img1.jpg'
import img2 from './DesignerImg/img2.jpg'
import img3 from './DesignerImg/img3.jpg'
import img4 from './DesignerImg/img4.jpg'
export default function DesignerHomeList() {
   
    let imgArray = [img1,img2,img3,img4]

  return (
    <div className='w-[100vw] h-[44vw] bg-[#f5f5f5] m-auto bg-[#f5f5f5] text-[black]'>
<div className="desgnerList w-[90vw]  m-auto py-[3vw]">
<div className="topHeading mb-[1vw] flex justify-between items-end pr-[1vw]">
            <div className="designContents">
            <p className='font-[300] text-[1vw]'>Interor Designer System</p>
            <h2 className='text-[2.5vw] font-[400] '>Meet Our Designers</h2>
            </div>
            <div className="showAllDesigns">
                <button className='text-[0.6vw] font-[600] bg-[black] text-[white] border rounded-[100vw] px-[1.7vw] py-[0.9vw] border-black'>View More</button>
            </div>
          
        </div>
        <div className="displayDesigns ">
            <ul className='flex gap-[1vw]'>
            {imgArray.slice(0,4).map((val,id)=>
            <li key={id} className='relative bg-[black] w-[50%]  flex flex-col justify-center items-center relative'>
<img src={imgArray[id]} alt="" style={{objectFit:'cover',filter:'grayscale(100%)'}}  className='w-[100%] h-[100%] opacity-[0.5]' />
<h3 className='text-[1.5vw] font-[600] mt-[0.6vw] absolute text-[white] '>Pranesh Mali</h3>
            </li>
            )}
            </ul>

        </div>
</div>
    </div>
  )
}
