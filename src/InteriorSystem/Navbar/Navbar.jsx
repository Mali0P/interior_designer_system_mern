import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Convert to boolean directly
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from storage
    setIsLoggedIn(false); // Update login state
  };

  return (
    <div
      style={{ zIndex: '9999', boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px' }}
      className='navbar w-[100vw] h-[4.6vw] text-[white] top-0 bg-[rgb(0,0,0,0.8)] fixed z-20 px-[5vw] flex justify-between items-center'
    >
      <nav className='flex justify-between items-center w-[100%]'>
        <h1 className='text-[1.4vw] font-[600]'>IDS</h1>
        <ul className='flex gap-[1vw] text-[1vw] font-[500]'>
          <li>Featured</li>
          <li>Designers</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        {!isLoggedIn ? (
          <Link to='/login'>
            <button
              style={{ backdropFilter: 'blur(2vw)' }}
              className='z-10 text-[0.7vw] rounded-[0.4vw] px-[1.3vw] py-[0.7vw] bg-[#575ef4] text-[white] font-[600]'
            >
              Login/Signup
              <FontAwesomeIcon icon={faRightFromBracket} className='ml-[0.5vw]' />
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{ backdropFilter: 'blur(2vw)' }}
            className='z-10 text-[0.7vw] rounded-[0.4vw] px-[1.3vw] py-[0.7vw] bg-[#ff4d4d] text-[white] font-[600]'
          >
            Logout
            <FontAwesomeIcon icon={faRightFromBracket} className='ml-[0.5vw]' />
          </button>
        )}
      </nav>
    </div>
  );
}
