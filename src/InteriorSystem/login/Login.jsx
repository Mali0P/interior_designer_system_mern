import React, { useState } from 'react';
import axios from 'axios';
import './Logincss.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost/Backend/user.php', {
        email,
        password,
      });

      if (response.data.success) {
        setSuccess('Login successful!');
        // Redirect or save user data
      } else {
        setError(response.data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    
    <div className='loginPage w-[100vw] h-[100vh] relative flex justify-center items-center'>
        <img src="" alt="" />

      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Login;
