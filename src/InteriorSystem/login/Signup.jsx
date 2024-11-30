import React, { useState } from 'react';
import axios from 'axios'; // Ensure you install axios: npm install axios
import singupbg from './loginImage/signupbg.jpg'
import './signupcss.css'
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    role: 'user', // Default role set to 'user'
    password: '',
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/Backend/user.php', {
        action: 'signup',
        ...formData
      });
      
      if (response.data.success) {
        setMessage('Signup successful!');
      } else {
        setMessage(response.data.error || 'Error during signup.');
      }
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-[black]'>
      <img src={singupbg} alt=""  className='absolute w-[100%] h-[100%] object-cover opacity-[0.7]'/>

      <div className="signupContainer absolute w-[76%] h-[90%] justify-center items-center flex">
        <div className="rightImgDiv relative">
          <div className="bgImage absolute w-[100%] h-[100%]"></div>
          <div className="content">
            <h3 className='text-[1vw]'>Interior Designer System</h3>
            <p className='text-[1vw]'>"Transforming Spaces, One Design at a Time."</p>
          </div>
        </div>

        <div className="formDiv w-[40%]">
          <form onSubmit={handleSubmit} className='flex flex-col px-[5vw]'>
            <h2>Create an account</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className='text-[black]'
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className='text-[black]'
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className='text-[black]'
              required
            />
            <select name="role" value={formData.role} onChange={handleChange} className='text-[black]'>
              <option value="user">User</option>
              <option value="designer">Designer</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className='text-[black]'
              required
            />
            <button type="submit">Signup</button>
          </form>
          {message && <p>{message}</p>}
          <p className='text-center text-[0.8vw] mt-[1vw] text-[black] cursor-pointer font-[500]'>
            <Link to={'/login'}>
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
