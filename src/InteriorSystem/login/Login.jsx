import React, { useState } from 'react';
import axios from 'axios'; // Ensure you install axios: npm install axios
import singupbg from './loginImage/signupbg.jpg'
import './signupcss.css'
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    role: '', // Default role
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
      setMessage(response.data.success ? 'Signup successful!' : response.data.error);
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <img src={singupbg} alt=""  className='absolute w-[100%] h-[100%] object-cover'/>
     
      <div className="signupContainer absolute w-[76%] h-[90%]  justify-center items-center flex">

      <div className="rightImgDiv">
<h3>Interior Designer System</h3>
<p>"Transforming Spaces, One Design at a Time."</p>
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
      </div>
  
      </div>
     
    </div>
  );
}

export default Signup;
