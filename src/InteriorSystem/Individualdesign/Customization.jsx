import React, { useState } from 'react';
import axios from 'axios';

const Customization = ({ designerId }) => {
  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : ''; // Ensure 'id' is available in the user object

  const [formData, setFormData] = useState({
    userId: userId,
    designerId: designerId, // Passed dynamically as a prop from image data
    width: '',
    height: '',
    color: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all fields before submission
    if (!formData.designerId || !formData.userId || !formData.width || !formData.height || !formData.color || !formData.price || !formData.description) {
      console.error("All fields are required");
      alert("Please fill all the fields before submitting.");
      return; // Stop submission if any field is missing
    }

    try {
      const response = await axios.post('http://localhost/Backend/customizationForm.php', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting customization:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="width" placeholder="Width" onChange={handleChange} required />
      <input type="number" name="height" placeholder="Height" onChange={handleChange} required />
      <input type="text" name="color" placeholder="Color" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <button type="submit">Submit Customization</button>
    </form>
  );
};

export default Customization;
