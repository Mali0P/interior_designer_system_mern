import React, { useState } from 'react';
import axios from 'axios'; // Ensure you install axios: npm install axios

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    role: 'user', // Default role
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
    <div style={{ width: '300px', margin: 'auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
