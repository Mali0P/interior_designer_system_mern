import axios from 'axios'
import React, { useEffect, useState } from 'react'
import img1 from './DesignIMages/img1.jpg'
import img2 from './DesignIMages/img2.jpg'
import img3 from './DesignIMages/img3.jpg'
import img4 from './DesignIMages/img4.jpg'
import { Link } from 'react-router-dom'
export default function Design() {
    const[designApi,designApiFun] = useState([])
    let fetchApi = async ()=>{
        try{
let getApi = await axios.get('https://jsonplaceholder.typicode.com/photos')
designApiFun(getApi.data)
        }
        catch(error){
designApiFun(error)
        }
    }
let imgArray = [img1,img2,img3,img4]
    useEffect(()=>{
        fetchApi()
    },[])
  return (
    <div className='homeDesign w-[100vw] h-[37vw] bg-[white] px-[5vw] py-[3vw] bg-[#f5f5f5] text-[black]'>
        <div className="topHeading mb-[1vw] flex justify-between items-end pr-[1vw]">
            <div className="designContents">
            <p className='font-[300] text-[1vw]'>Interor Designer System</p>
            <h2 className='text-[2.5vw] font-[400] '>Featured Designs</h2>
            </div>
            <div className="showAllDesigns">
                <button className='text-[0.6vw] font-[600] bg-[black] text-[white] border rounded-[100vw] px-[1.3vw] py-[0.6vw] border-black' style={{zIndex:2}}>View More</button>
            </div>
          
        </div>
        <div className="displayDesigns ">
            <ul className='flex gap-[1vw]'>
            {imgArray.slice(0,4).map((val,id)=>
            <li className='relative w-[50%]  flex flex-col justify-top items-center relative'>
             
<img src={imgArray[id]} alt="" style={{objectFit:'cover'}}  className='w-[100%] h-[68%] opacity-[1]' />
<Link to={`/design/${id}`}>
<h2>View Design</h2>
</Link>  </li>
            )}
            </ul>

        </div>
    </div>
  )
}
