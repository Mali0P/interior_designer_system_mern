import React, { useState } from 'react';
import axios from 'axios';
import singupbg from './loginImage/signupbg.jpg';
import './Logincss.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic client-side validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/Backend/adminLogin.php', {
        email,
        password,
      });

      console.log("Full Response:", response.data);  // Log the entire response to check its structure

      if (response.data.success) {
        // Destructure the admin data from the response
        const { admin_id, admin_email } = response.data;
        localStorage.setItem('admin', JSON.stringify({
          id: admin_id,
          email: admin_email,
        }));

        setSuccess('Login successful!');

        // Redirect to admin dashboard
        navigate('/admin'); // Redirect to the admin dashboard
      } else {
        setError(response.data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Error:", err);  // Log detailed error info
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='loginPage w-[100vw] h-[100vh] relative flex justify-center items-center bg-[black]'>
      <img src={singupbg} className='object-cover absolute w-[100%] h-[100%] opacity-[0.7]' alt="Background" />

      <div className="signupContainer absolute w-[76%] h-[90%] items-center flex">
        <div className="rightImgDiv relative w-[70%]">
          <div className="bgImage absolute w-[100%] h-[100%]"></div>
          <div className="content">
            <h3 className='text-[1vw]'>Interior Designer System</h3>
            <p className='text-[1vw]'>"Transforming Spaces, One Design at a Time."</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col px-[5vw] w-[40%]'>
          <h2 className='text-[3vw] font-[600]'>Admin Login</h2>
          <h2 className='text-[1.2vw] font-[600]'>Login to your account</h2>
          <label>Email:</label>
          <input
            className='w-[100%]'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p className='text-center text-[0.8vw] cursor-pointer'>
            <Link to={'/signup'}>Create an account?</Link>
          </p>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
