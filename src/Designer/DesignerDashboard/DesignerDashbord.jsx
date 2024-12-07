import React, { useState } from 'react';
import { faAddressBook, faCaretDown, faPowerOff, faUser, faPlus, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import UploadDesign from '../uploadDesign/';
import ShowDesign from './showDesign/ShowDesign';
import CustomizationRequest from './CustomizationRequest/CustomizationRequest';


export default function DesignerDashboard() {



  const navigate = useNavigate(); // Hook to redirect after logout

  // Handle input change for designer data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// Retrieve the stored user data from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));




  const handleLogout = () => {
    // Clear session data (for example, localStorage or cookies)
    localStorage.removeItem('userToken');  // Example: clear token from local storage
    sessionStorage.clear();  // Optionally, clear sessionStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="w-[100vw] flex">
      {/* Left Sidebar */}
      <div className="leftDashboard bg-[white] w-[22vw] h-[100%] fixed top-0 left-0">
        <div className="leftIcon bg-[#4f65df] w-[100%] h-[100%] flex flex-col justify-between py-[3vw] px-[2vw] items-center">
          <div className="firstDiv">
            <ul className='text-[white] text-[1vw] flex flex-col gap-[1vw]'>
              <li className='text-[2vw] font-[500] border-b pb-[1vw] border-[rgb(255,255,255,0.4)]'>
                Interior Designer System
              </li>
              <li className='text-[white] font-[600]'>
                <FontAwesomeIcon icon={faUser} /> My Profile
              </li>
              <li className='text-[rgb(255,255,255,0.8)]'>
                <a href="#mydesigns"> <FontAwesomeIcon icon={faHandPointUp} /> My Designs</a>
               
              </li>
              <li className='text-[rgb(255,255,255,0.8)]'>
                <FontAwesomeIcon icon={faPlus} /> Add Designs
              </li>
              <li className='text-[rgb(255,255,255,0.8)]'>
                <FontAwesomeIcon icon={faCaretDown} /> Customization Request
              </li>
              <li className='text-[rgb(255,255,255,0.8)] cursor-pointer' onClick={handleLogout}>
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </li>
            </ul>
          </div>
          <div className="secondDiv">
            <ul className='text-[white]'>
              <li>Contact Us <FontAwesomeIcon icon={faAddressBook} /></li>
            </ul>
          </div>
        </div>
      </div>


      <div className="rightDashboard w-[78vw] h-[300%] bg-[#f2f2f2] relative px-[3vw] py-[2vw] flex ml-[22vw] flex-col">
    
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className="myProfile w-[100%] h-[22%] relative bg-[white] pr-[4vw] px-[4vw] py-[1vw] rounded-[1vw] border flex justify-around">
          <div className="topContent w-[40%] h-[100%] relative">
            <h2 className='text-[3vw] font-[500]'>Hello, {storedUser.username}!</h2>
            <h2 className='text-[1vw] font-[400]'>Designer / Dashboard</h2>
            <img
              className="w-[60%] h-[50%] mt-[1vw] object-cover"
              style={{ objectPosition: 'center' }}
              src="https://img.freepik.com/free-vector/flat-world-graphics-day-illustration_23-2148880103.jpg?t=st=1733252302~exp=1733255902~hmac=9fd07f8f17936c54016b31c0658e39a3cf711dcdcc3bea48c479985d7d09ac1e&w=740"
            />
          </div>
          <div className="topContent w-[50%] h-[100%] py-[2vw] relative">
            <h2 className='text-[1.5vw] text-[rgb(0,0,0,0.9)] font-[600] mb-[2vw]'>IDS / My Profile</h2>
         
              <ul className='flex flex-col gap-[1vw]'>
                <li>
                  <label className='font-[600]'>Name</label>
              
                    <h2 className='font-[500] text-[1.4vw]'>{storedUser.username}</h2>
                
                </li>
                <li>
                  <label className='font-[600]'>Email</label>
                
                    <h2 className='font-[500] text-[1.4vw]'>{storedUser.email}</h2>
                  
                </li>
                <li>
                  <label className='font-[600]'>Address</label>
                 
                    <h2 className='font-[500] text-[1.4vw]' style={{textTransform:'capitalize'}}>{storedUser.address}</h2>
               {console.log(storedUser)}
                </li>
                <li>
                  <button className='font-[600] bg-[#20c55d] text-white w-[40%] px-[2vw] py-[0.5vw] text-center rounded-[10vw]'>My Designs</button>
                </li>

        
              </ul>
        
          </div>
        </div>

        {/* My Designs Section */}
        <div id='mydesigns' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', minHeight:'40vw' }} className="addDesign w-[100%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]" >
            <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw] text-[black]'>My Designs</h3>
            <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw] text-[0.6vw]'>Interior Designer System / View Designs</h3>
  
    <ShowDesign/>
   
  
  
        </div>

        
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className="flex justify-between addDesign w-[100%] h-[45vw] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
        <div className="imgDiv w-[50%] h-[100%] bg-[black] flex flex-col justify-center items-center relative">

<img src="https://files.planoplan.com/upload/content/750/4b2d2885.webp" className='w-[100%] opacity-[0.5] object-cover h-[100%] absolute' alt="" />
<h2 className='text-[white] text-[2vw] font-[600] absolute'>Add Your Designs</h2>
</div>
        <div className="addDesignForm w-[45%]">
        <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Add Design</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Designer System / Add Design</h3>
     
    <UploadDesign/>
 
        </div>
        
 
  
        </div>
        <div id='mydesigns' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', minHeight:'40vw' }} className="addDesign w-[100%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]" >
            <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw] text-[black]'>My Customization Request</h3>
            <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw] text-[0.6vw]'>Interior Designer System / View Requests</h3>
  
    <CustomizationRequest/>
   
  
  
        </div>
      </div>
    </div>
  );
}
