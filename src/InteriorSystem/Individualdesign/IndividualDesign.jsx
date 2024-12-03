import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function IndividualDesign() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  const [customizationData, setCustomizationData] = useState({
    width: '',
    height: '',
    color: '',
    price: '',
    description: '',
    UserId: userData.id,
    DesignerId: '', // Initialize as empty
  });

  useEffect(() => {
    fetch(`http://localhost/Backend/getIndividualDesign.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setDesign(data.design);

          // Set DesignerId in customization data after fetching design
          setCustomizationData((prevData) => ({
            ...prevData,
            DesignerId: data.design.DesignerId,
          }));
        } else {
          setError(data.message || 'Error fetching design details');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch design details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setCustomizationData({
      ...customizationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomizeSubmit = (e) => {
    e.preventDefault();
    
    // Log customization data to verify if everything is there
    console.log("Customization Data: ", customizationData);

    fetch('http://localhost/Backend/submitCustomization.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customizationData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        alert('Customization submitted successfully!');

        // Reset form fields
        setCustomizationData({
          width: '',
          height: '',
          color: '',
          price: '',
          description: '',
          UserId: userData.id,
          DesignerId: customizationData.DesignerId, // Correct reference to DesignerId
        });

        // Close the customization form
        setShowCustomize(false);
      } else {
        alert('Failed to submit customization.');
      }
    })
    .catch(() => {
      alert('An error occurred. Please try again.');
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-[100vw] h-[150vh] bg-[#f1f1f1] flex px-[10.1vw] justify-center items-center'>
      <Navbar />
      <div className="leftContentDesign bg-[skyblue] flex basis-[50%] h-[80%]">
        <img
          src={`http://localhost/Backend/DesignImage/${design.image}`}
          alt={design.Name}
          width='100%'
          height='100%'
          className='object-cover'
        />
      </div>
      <div className="rightContentDesign flex basis-[50%] w-[50%] h-[80%] py-[7vw] px-[4vw] bg-[white]">
        <ul className='w-[100%]'>
          <li className='text-[0.8vw] mb-[0.3vw]'>Interior Designer System / {design.Category || 'Aesthetic'}</li>
          <li className='text-[2.4vw] font-[500]'>{design.Name}</li>
          <li className='text-[1vw] my-[0.8vw]'>Price: Rs {design.Price}</li>
          <li className='text-[1vw] my-[0.8vw]'>Height: {design.Height}m Width: {design.Width}m</li>
          <li className='text-[1vw] my-[0.8vw]'>Category: {design.Category || 'Standard'}</li>
          <li className='text-[1vw] my-[0.8vw]'>Color: {design.Color || 'Default'}</li>
          <li className='text-[1.2vw] my-[1.2vw]'>
            Description<br />
            <span className='text-[0.8vw]'>{design.Description}</span>
          </li>
          <button onClick={() => setShowCustomize(!showCustomize)} className='bg-[black] px-[1vw] py-[0.5vw] text-white'>
            {showCustomize ? 'Hide Customization' : 'Customize Design'}
          </button>
          {showCustomize && (
            <form onSubmit={handleCustomizeSubmit} className='mt-[1vw]'>
              <ul className='text-[1vw]'>
                <li className='my-[0.7vw]'>
                  <label>Width</label>
                  <input type="text" className='form-input w-[35%] mr-[1vw]' name="width" value={customizationData.width} onChange={handleChange} placeholder="Enter Width" />
               
                  <label>Height</label>
                  <input type="text" className='form-input w-[35%]' name="height" value={customizationData.height} onChange={handleChange} placeholder="Enter Height" />
                </li>
                <li className='my-[0.7vw]'>
                  <label>Color</label>
                  <input type="text" className='form-input w-[35%] mr-[1vw]' name="color" value={customizationData.color} onChange={handleChange} placeholder="Enter Color" />
             
                  <label>Price</label>
                  <input type="text" className='form-input w-[35%]' name="price" value={customizationData.price} onChange={handleChange} placeholder="Enter Price" />
                </li>
                <li className='my-[0.7vw] flex items-center justify-center'>
                  <label>Description</label>
                  <textarea className='form-input border' name="description" value={customizationData.description} onChange={handleChange} placeholder="Enter Description"></textarea>
            
                <button type="submit" className='btn-submit'>Submit Customization</button>
                </li>
              </ul>
            </form>
          )}
        </ul>
      </div>
    </div>
  );
}
