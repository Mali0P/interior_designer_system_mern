import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function DesignerHomeList() {
    const[designApi,designApiFun] = useState([])
    let fetchApi = async ()=>{
        try{
let getApi = await axios.get('https://fake-json-api.mock.beeceptor.com/users')
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
    <div className='w-[100vw] h-[37vw] bg-[#f5f5f5] m-auto bg-[black]'>
<div className="desgnerList w-[90vw] border-t border-black m-auto py-[3vw]">
<div className="topHeading mb-[1vw] flex justify-between items-end pr-[1vw]">
            <div className="designContents">
            <p className='font-[300] text-[1vw]'>Interor Designer System</p>
            <h2 className='text-[2.5vw] font-[400] '>Meet Designers</h2>
            </div>
            <div className="showAllDesigns">
                <button className='text-[0.6vw] font-[600] bg-[black] text-[white] border rounded-[100vw] px-[1.7vw] py-[0.9vw] border-black'>View More</button>
            </div>
          
        </div>
        <div className="displayDesigns">
            <ul className='flex gap-[1vw]'>
            {designApi.slice(0,4).map((val,id)=>
            <li className='relative bg-[white] w-[50%] py-[2vw] flex flex-col justfy-center items-center'>
<img src={val.photo} alt="" style={{objectFit:'cover'}}/>
<h3 className='text-[1vw] font-[600] mt-[0.6vw]'>{val.username.split(' ').slice(0, 2).join(' ')}</h3>
            </li>
            )}
            </ul>

        </div>
</div>
    </div>
  )
}
