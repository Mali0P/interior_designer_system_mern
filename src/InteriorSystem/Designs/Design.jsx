import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

    useEffect(()=>{
        fetchApi()
    },[])
  return (
    <div className='homeDesign w-[100vw] h-[37vw] bg-[white] px-[5vw] py-[3vw] bg-[#f5f5f5] text-[black]'>
        <div className="topHeading mb-[1vw] flex justify-between items-end pr-[1vw]">
            <div className="designContents">
            <p className='font-[300] text-[1vw]'>Interor Designer System</p>
            <h2 className='text-[2.5vw] font-[400] '>Our Designs</h2>
            </div>
            <div className="showAllDesigns">
                <button className='text-[0.6vw] font-[600] bg-[black] text-[white] border rounded-[100vw] px-[1.3vw] py-[0.6vw] border-black'>View More</button>
            </div>
          
        </div>
        <div className="displayDesigns">
            <ul className='flex gap-[1vw]'>
            {designApi.slice(0,4).map((val,id)=>
            <li>
<img src={val.url} alt="" style={{objectFit:'cover'}}/>
<h3 className='text-[1vw] font-[500] mt-[0.6vw]'>{val.title.split(' ').slice(0, 2).join(' ')}</h3>
            </li>
            )}
            </ul>

        </div>
    </div>
  )
}
