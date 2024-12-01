import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadDesign = () => {
  const [formData, setFormData] = useState({
    DesignerId: '', // Initialize with an empty string
    Name: '',
    Height: '',
    Width: '',
    Description: '',
    Price: '',
    image: null,
  });

  // Retrieve DesignerId (stored as id in 'user' object in localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user object
    if (user && user.id) {
      setFormData((prevData) => ({ ...prevData, DesignerId: user.id }));
    } else {
      console.error("DesignerId (user.id) is not found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all form data
    for (const key in formData) {
      console.log(key, formData[key]); // Log form data before submission
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost/Backend/uploadDesign.php',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Response Data:', response.data); // Log the response
      if (response.data.status === 'success') {
        alert(response.data.message);
  
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Axios Error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (



    <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-[100%] flex flex-col h-[100%] gap-[0.2vw]'>
      <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="Height" placeholder="Height" onChange={handleChange} required />
      <input type="number" name="Width" placeholder="Width" onChange={handleChange} required />
      <textarea name="Description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="Price" placeholder="Price" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} required  className='bg-[#f1f1f1] text-[black] '/>
      <button type="submit" className='mt-[0.3vw]' >Upload Design</button>
    </form>


  );
};

export default UploadDesign;
