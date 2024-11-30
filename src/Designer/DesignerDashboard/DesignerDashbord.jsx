import React, { useState } from 'react';
import { faAddressBook, faCaretDown, faPowerOff, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import UploadDesign from '../uploadDesign/';
import ShowDesign from './showDesign/ShowDesign';


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

      {/* Right Dashboard */}
      <div className="rightDashboard w-[78vw] h-[300%] bg-[#f2f2f2] relative px-[3vw] py-[2vw] flex ml-[22vw] flex-col">
        {/* Profile Section */}
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className="myProfile w-[100%] h-[32%] relative bg-[white] pr-[4vw] px-[4vw] py-[1vw] rounded-[1vw] border flex justify-between">
          <div className="topContent w-[40%] h-[100%] relative">
            <h2 className='text-[3vw] font-[500]'>Hello, {storedUser.username}!</h2>
            <h2 className='text-[1vw] font-[400]'>Designer / Dashboard</h2>
            <img
              className="w-full h-[80%] mt-[1vw] object-cover"
              style={{ objectPosition: 'center' }}
              src="https://images.squarespace-cdn.com/content/v1/574512d92eeb81676262d877/23c81b18-6a05-4691-9c9c-884f3842bc9e/Lexie-2MB.jpg?format=1500w"
              alt="Profile"
            />
          </div>
          <div className="topContent w-[50%] h-[100%] py-[2vw] relative">
            <h2 className='text-[2vw] text-[rgb(0,0,0,0.9)] font-[600] mb-[2vw]'>IDS / My Profile</h2>
         
              <ul className='flex flex-col gap-[2vw]'>
                <li>
                  <label className='font-[600]'>Name</label>
              
                    <h2 className='font-[500] text-[2vw]'>{storedUser.username}</h2>
                
                </li>
                <li>
                  <label className='font-[600]'>Email</label>
                
                    <h2 className='font-[500] text-[2vw]'>{storedUser.email}</h2>
                  
                </li>
                <li>
                  <label className='font-[600]'>Address</label>
                 
                    <h2 className='font-[500] text-[2vw]' style={{textTransform:'capitalize'}}>{storedUser.address}</h2>
               {console.log(storedUser)}
                </li>
                <li>
                  <button className='font-[600] bg-[#20c55d] text-white w-[40%] px-[2vw] py-[0.5vw] text-center rounded-[10vw]'>My Designs</button>
                </li>

        
              </ul>
        
          </div>
        </div>

        {/* My Designs Section */}
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', minHeight:'40vw' }} className="addDesign w-[100%] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]" >
            <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw] text-[black]'>My Designs</h3>
            <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw] text-[0.6vw]'>Interior Designer System / View Designs</h3>
      <ShowDesign/>
        </div>

        
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className="addDesign w-[100%] h-[35vw] bg-[white] mt-[2vw] rounded-[1vw] border px-[2vw] py-[3vw]">
          <h3 className='text-[1vw] font-[600] text-[rgb(0,0,0)] mb-[0.4vw]'>Add Design</h3>
          <h3 className='text-[1.2vw] text-[rgb(0,0,0,0.7)] mb-[1vw]'>Interior Designer System / Add Design</h3>
    <UploadDesign/>
        </div>
      </div>
    </div>
  );
}
