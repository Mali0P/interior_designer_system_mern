import { faAddressBook, faCaretDown, faGear, faPlus, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function DesignerDashbord() {
  return (
    <div className='w-[100vw] h-[100vh] flex'>
        <div className="leftDashboard bg-[white] w-[22vw] h-[100%] fixed top-0 left-0">
      
                <div className="leftIcon bg-[#4f65df] w-[100%] h-[100%] flex flex-col justify-between py-[3vw] px-[2vw] items-center">
                    <div className="firstDiv">
                    <ul className='text-[white] text-[1vw] flex flex-col gap-[1vw]'>
                        <li className='text-[2vw] font-[500] border-b pb-[1vw] border-[rgb(255,255,255,0.4)]'>Interior Designer System</li>
                        <li className='text-[white] font-[600]'><FontAwesomeIcon icon={faUser} /> My Profile</li>
                        <li className='text-[rgb(255,255,255,0.8)]'><FontAwesomeIcon icon={faPlus}/> Add Designs</li>
                        <li className='text-[rgb(255,255,255,0.8)]'><FontAwesomeIcon icon={faCaretDown} /> Customization Request</li>
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
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} className="myProfile w-[100%] h-[32%] relative bg-[white] pr-[4vw] px-[4vw] py-[1vw] rounded-[1vw] border flex justify-between ">
              
                <div className="topContent w-[40%] h-[100%] relative ">
                <h2 className='text-[3vw] font-[500]'>Hello, Mali!</h2>
                <h2 className='text-[1vw] font-[400]'>Have a good day!</h2>
                <img 
  className="w-full h-[80%] mt-[1vw] object-cover" 
  style={{ objectPosition: 'center' }} 
src="https://images.squarespace-cdn.com/content/v1/574512d92eeb81676262d877/23c81b18-6a05-4691-9c9c-884f3842bc9e/Lexie-2MB.jpg?format=1500w"
/>
              </div>
                <div className="topContent w-[50%] h-[100%] py-[2vw] relative ">
                <h2 className='text-[2vw] text-[rgb(0,0,0,0.7)] font-[300] mb-[2vw]'>IDS / My Profile</h2>
       
                    
<form>
  <ul className='flex flex-col gap-[2vw]'>
    <li>
        <label htmlFor="">Name</label>
        <h2>Pranesh Mali</h2>
    </li>
    <li>
        <label htmlFor="">Email</label>
        <h2>Pranesh Mali</h2>
    </li>
    <li>
        <label htmlFor="">Address</label>
        <h2>Pranesh Mali</h2>
    </li>
    <li>
        <label htmlFor="">Name</label>
        <h2>Pranesh Mali</h2>
    </li>
    <li>
        <label htmlFor="">Name</label>
        <h2>Pranesh Mali</h2>
    </li>
    <li>
     <button className='bg-[black] px-[2vw] py-[0.5vw] text-[white]'>Edit Profile</button>
    </li>
  </ul>
</form>
              </div>
            
           
               
            </div>
            

            <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} className="addDesign w-[100%] h-[30%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>My Designs</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Desgner System / View Designs</h3>
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
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Add Design</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Desgner System / Add Design</h3>
            <form className='w-[100%] h-[90%] flex justify-between pl-[1vw]'>

  <div className="inputDataDiv bg-[red] w-[53%] h-[90%] ">

  </div>
  <div className="uploadImgDiv w-[43%] h-[90%] bg-[red] ">
<img className='w-[100%] h-[100%] object-cover' src="https://www.mariposakids.co.nz/wp-content/uploads/2014/08/image-placeholder2.jpg" alt="" />
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
