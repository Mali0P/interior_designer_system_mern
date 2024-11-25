import { faAddressBook, faCaretDown, faGear, faPlus, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function AdminHomepage() {
  return (
    <div className='w-[100vw] h-[100vh] flex'>
        <div className="leftDashboard bg-[white] w-[22vw] h-[100%] fixed top-0 left-0" >
      
                <div className="leftIcon bg-[#3d4b65] w-[100%] h-[100%] flex flex-col justify-between py-[3vw] px-[2vw] items-center">
                    <div className="firstDiv">
                    <ul className='text-[white] text-[1vw] flex flex-col gap-[1vw] '>
                        <li className='text-[2vw] font-[500] border-b pb-[1vw] border-[rgb(255,255,255,0.4)]'>Interior Designer System / Admin</li>
                        <li className='text-[white] font-[600]'><a href="#dashboard"> <FontAwesomeIcon icon={faUser} /> Dashboard</a></li>
                        <li className='text-[rgb(255,255,255,0.8)]'><a href="#showCategories"> <FontAwesomeIcon icon={faPlus}/> Add Category</a></li>
                        <li className='text-[rgb(255,255,255,0.8)]'> <a href="#designs"><FontAwesomeIcon icon={faCaretDown} /> Designs</a></li>
                        <li className='text-[rgb(255,255,255,0.8)]'><a href="#users"><FontAwesomeIcon icon={faCaretDown} /> Users</a></li>
                        <li className='text-[rgb(255,255,255,0.8)]'><FontAwesomeIcon icon={faCaretDown} /> Designers</li>
                        <li className='text-[rgb(255,255,255,0.8)]'><FontAwesomeIcon icon={faPowerOff} /> Logout</li>
                    </ul>
                    </div>
                    <div className="secondDiv">
                    <ul className='text-[white]'>
                        <li>Contact Us <FontAwesomeIcon icon={faAddressBook} /></li>
                    </ul>
                    </div>
                  

            </div>

        </div>
        <div className="rightDashboard w-[78vw] h-[300%] bg-[#f2f2f2] relative  px-[3vw] py-[2vw] flex ml-[22vw] flex-col" >
            <h3 className='text-[1.4vw] font-[500] text-[rgb(0,0,0,0.7)] ml-[2vw] mb-[1vw]' id='dashboard'>IDS / Admin Dashboard</h3>
<div className="dashBoard w-[100%]  h-[25%]  grid grid grid-cols-[30%_30%_30%] gap-[2vw] justify-center">
    
    <div className="userCount bg-[#25b6cb] "></div>
    <div className="userCount bg-[#e44542]"></div>
    <div className="userCount bg-[#52a555]"></div>
</div>
              
        
            

            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} id='showCategories' className="showCategories w-[100%] h-[30%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Categories</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw] flex justify-between'>Interior Desgner System / Add Category <span className='bg-[#3299fe] text-[0.9vw] px-[2vw] cursor-pointer text-[white] py-[0.5vw] font-[600] '>Add Category</span></h3>
            <form className='w-[100%] h-[90%] pl-[1vw] grid grid-cols-3'>
<div className="col-span-5 grid grid-cols-[10%_30%_30%] font-[600] flex gap-[1vw] " style={{listStyle:'none'}}>
<li>Sn no.</li>
<li>Categories</li>
<li>Action</li>
</div>


  

 </form>


            </div>


   
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} id='designs' className="designs w-[100%] h-[30%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Our Designs</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Desgner System / Designs</h3>
            <form className='w-[100%] h-[90%] pl-[1vw] grid grid-cols-5'>
<div className="col-span-5 grid grid-cols-[5%_19%_19%_19%_19%_19%] font-[600] flex gap-[1vw] " style={{listStyle:'none'}}>
<li>Sn no.</li>
<li>Image</li>
<li>Description</li>
<li>Dimensions</li>
<li>Price</li>
<li>Action</li>
</div>


  

 </form>


            </div>
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} id='users' className="users w-[100%] h-[30%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Customization Requests</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Desgner System / User Requests</h3>
            <form className='w-[100%] h-[90%] pl-[1vw] grid grid-cols-5'>
<div className="col-span-5 grid grid-cols-[5%_19%_19%_19%_19%_19%] font-[600] flex gap-[1vw] " style={{listStyle:'none'}}>
<li>Sn no.</li>
<li>Image</li>
<li>Height</li>
<li>Width</li>
<li>Description</li>
<li>Action</li>
</div>


  

 </form>


            </div>
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} className="addDesign w-[100%] h-[30%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Customization Requests</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Desgner System / User Requests</h3>
            <form className='w-[100%] h-[90%] pl-[1vw] grid grid-cols-5'>
<div className="col-span-5 grid grid-cols-[5%_19%_19%_19%_19%_19%] font-[600] flex gap-[1vw] " style={{listStyle:'none'}}>
<li>Sn no.</li>
<li>Image</li>
<li>Height</li>
<li>Width</li>
<li>Description</li>
<li>Action</li>
</div>


  

 </form>


            </div>
    

        </div>

    </div>
  )
}
