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
    Color: '',
    Pattern: '',
    Category: '', // Store selected categories as a string
  });

  const [categories, setCategories] = useState([]); // To store available categories from the backend

  // Retrieve DesignerId (stored as id in 'user' object in localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user object
    if (user && user.id) {
      setFormData((prevData) => ({ ...prevData, DesignerId: user.id }));
    } else {
      console.error("DesignerId (user.id) is not found in localStorage");
    }

    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost/Backend/getCategories.php'); // PHP file to fetch categories
        if (response.data.status === 'success') {
          setCategories(response.data.categories); // Set categories to state
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Category') {
      const selectedCategories = Array.from(e.target.selectedOptions, option => option.text).join(','); // Join category names as a comma-separated string
      setFormData((prevData) => ({ ...prevData, Category: selectedCategories }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all form data
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost/Backend/uploadDesign.php',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

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
    <form onSubmit={handleSubmit} encType="multipart/form-data" className='w-[100%] flex flex-col h-[90%] gap-[0.2vw]'>
      <input type="text" name="Name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="Height" placeholder="Height" onChange={handleChange} required />
      <input type="number" name="Width" placeholder="Width" onChange={handleChange} required />
      <textarea name="Description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="Price" placeholder="Price" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} required className='bg-[#f1f1f1] text-[black]' />
      <input type="text" name="Color" placeholder="Color" onChange={handleChange} required />
      <input type="text" name="Pattern" placeholder="Pattern" onChange={handleChange} required />
      
      {/* Dropdown for selecting multiple categories */}
      <select
        name="Category"
        multiple
        onChange={handleChange}
        value={formData.Category.split(',')} // Convert comma-separated string to array to reflect selected options
        required
        className="bg-[#f1f1f1] text-black p-[10px] h-[5vw] overflow-scroll"
      >
        {categories.map((category) => (
          <option
            key={category.CategoryId}
            value={category.Category} // Store the category name in the value
            className="bg-[#f1f1f1] text-black hover:bg-gray-200 focus:bg-black-300 selected:bg-black selected:text-white"
          >
            {category.Category} {/* Display the category name here */}
          </option>
        ))}
      </select>

      <button type="submit" className='mt-[0.3vw]'>Upload Design</button>
    </form>
  );
};

export default UploadDesign;
