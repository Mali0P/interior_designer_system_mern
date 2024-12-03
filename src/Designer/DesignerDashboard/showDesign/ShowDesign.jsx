import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowDesign = () => {
  const [designs, setDesigns] = useState([]);

  // Get DesignerId from localStorage
  const designerId = JSON.parse(localStorage.getItem('user')).id;

  // Fetch the designs based on the DesignerId when the component mounts
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.post('http://localhost/Backend/designerShowDesigns.php', { designerId });
        if (response.data.status === 'success') {
          setDesigns(response.data.designs); // Assuming 'designs' is an array in the response
        } else {
          alert('Error fetching designs');
        }
      } catch (error) {
        console.error('Error fetching designs:', error);
        alert('Error fetching designs');
      }
    };

    fetchDesigns();
  }, [designerId]);

  // Function to handle delete design
  const handleDelete = async (id) => {
    try {
      // Send a POST request to delete the design
      const response = await axios.post('http://localhost/Backend/deleteDesign.php', { id });
      
      if (response.data.status === 'success') {
        alert('Design deleted successfully');
        // Remove the deleted design from the state
        setDesigns(designs.filter(design => design.Id !== id));
      } else {
        alert('Error deleting design');
      }
    } catch (error) {
      console.error('Error deleting design:', error);
      alert('Error deleting design');
    }
  };

  return (
    <div className='w-[100%]'>
      <table className='w-[100%] gap-[3vw]'>
        <thead className='border-b border-[rgb(0,0,0,0.2)] py-[2vw] h-[3vw]'>
          <tr className='text-center'>
            <th className='text-[0.8vw]'>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Height</th>
            <th>Width</th>
            <th className='px-[2vw]'>Description</th>
            <th className='w-[10%] text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design, index) => (
            <tr key={design.Id} className='h-[10vw]' style={{ backgroundColor: index % 2 === 0 ? '#f7f8fc' : 'white' }}>
              <td className='text-center'>{index + 1}</td>
              <td className='px-[0.5vw] w-[20%]'>
                <img 
                  className='m-auto'
                  src={`http://localhost/Backend/DesignImage/${design.image}`}
                  alt={design.Name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </td>
              <td className='w-[10%] text-[0.8vw] font-[600]'>{design.Name}</td>
              <td className='w-[10%] text-center'>{design.Height}</td>
              <td className='w-[10%] text-center'>{design.Width}</td>
              <td className='w-[50%] px-[2vw] text-[0.7vw]'>{design.Description}</td>
              <td>
                <button 
                  className='bg-[red] text-white py-[0.5vw] px-[2vw] text-[0.9vw] rounded-[4vw]' 
                  onClick={() => handleDelete(design.Id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDesign;
