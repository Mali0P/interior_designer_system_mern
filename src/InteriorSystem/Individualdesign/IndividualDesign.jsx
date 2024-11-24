import React, { useState } from 'react'
import designImg from '../Designs/DesignIMages/img1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
export default function IndividualDesign() {
  const[showCustomize,showCustomizeFun] = useState(false)
  return (
    <div className='w-[100vw] h-[140vh] bg-[#f1f1f1] flex px-[10.1vw] justify-center items-center'>
<div className="leftContentDesign bg-[skyblue] flex basis-[50%] h-[80%] ">
  <img src={designImg} alt="" width='100%' height='100%' className='object-cover' />
</div>
<div style={{boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px'}} className="rightContentDesign flex basis-[50%] w-[50%] h-[80%] py-[7vw] px-[4vw] bg-[white]">
  <ul className='w-[100%]'>
    <li className='text-[rgb(0,0,0,0.8)] text-[0.8vw] mb-[0.3vw]'>Interior Designer System / Asthetic</li>
    <li className='text-[black] text-[2.4vw] font-[500] flex items-center justify-between w-[100%]'>Ramro Kotha <span className='text-[0.9vw] text-[rgb(0,0,0,0.8)] '>by Pranesh Mali</span></li>
    <li className='text-[rgb(0,0,0,0.9)] text-[1vw] mb-[0.3vw] my-[0.8vw]'>like (3)</li>
    <li className='text-[rgb(0,0,0,0.9)] text-[1vw] mb-[0.3vw] my-[0.8vw]'>Price: Rs 15,000</li>
    <li className='text-[rgb(0,0,0,0.9)] text-[1vw] mb-[0.3vw] my-[0.8vw]'>Heght: 3m Width:   4m</li>
    <li className='text-[black] text-[1vw] font-[500] flex flex-col w-[100%] my-[0.8vw]'>Color <br />
    <span className='bg-[red] w-[2vw] h-[2vw] border-[rgb(0,0,0,0.8)] border-[0.15vw] rounded-[100vw] mt-[0.3vw] '></span></li>
    <li className='text-[black] text-[1.2vw] font-[500] flex flex-col w-[100%] my-[1.2vw] '>Description<br />
    <span className='text-[0.8vw] font-[400]'>Lorem ipsum dolr, sit amet consectetur adipisicing elit. Aperiam voluptas quaerat libero, iste ipsum accusamus. Accusantium perferendis nihil nam sunt!</span></li>

    <li className='text-[rgb(0,0,0,0.8)] text-[0.8vw] mb-[0.3vw] my-[1.2vw]'></li>
    <li className='text-[rgb(0,0,0,0.8)] text-[0.8vw] mb-[0.3vw] '>
    <div className="showCustomize relative h-[0vw] overflow-hidden" style={{height:showCustomize?'14vw':'0vw',transition:'0.5s ease'}}>
        <form action="">
          <h3>Customize Request Form</h3>
          <ul>
          <li className='my-[0.7vw]'>
          <label className='mr-[0.5vw]'>Width</label>
          <input type="text" className='w-[40%] px-[1vw] py-[0.3vw] border-[black] rounded-[0.3vw]'/>
          </li>
          <li className='my-[0.7vw]'>
          <label className='mr-[0.5vw]'>Height</label>
          <input type="text" className='w-[40%] px-[1vw] py-[0.3vw] border-[black] rounded-[0.3vw]'/>
          </li>
          <li className='my-[0.7vw]'>
          <label className='mr-[0.9vw]'>Color</label>
          <input type="text" className='w-[40%] px-[1vw] py-[0.3vw] border-[black] rounded-[0.3vw]'/>
          </li>
          <li className='my-[0.7vw]'>
          <label className='mr-[0.5vw]'>Budget</label>
          <input type="text" className='w-[40%] px-[1vw] py-[0.3vw] border-[black] rounded-[0.3vw]'/>
          </li>
          <li className='my-[0.7vw]'>
          <label className='mr-[0.5vw]'>Description</label>
          <input type="text" className='w-[40%] px-[1vw] py-[0.3vw] border-[black] rounded-[0.3vw]'/>
          </li>
          </ul>
        </form>
      </div>
      <div className="CustomizeDesign">
        <h2 className='px-[1vw] py-[0.5vw] w-[40%] text-[white] text-center mt-[0.9vw] cursor-pointer' onClick={()=>{showCustomizeFun(!showCustomize)}} style={{backgroundColor:showCustomize?'#28a643':'black'}}>{showCustomize?'Submit Design':'Customize Design'} </h2>
      </div>
     
    </li>
  </ul>
</div>

    </div>
  )
}
