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
        const response = await axios.post('http://localhost/Backend/getDesigns.php', { designerId });
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
      <table className='w-[100%] gap-[3vw]' >
        <thead className='border-b border-[rgb(0,0,0,0.2)] py-[2vw] h-[3vw]'>
          <tr className='text-left'>
            <th>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Height</th>
            <th>Width</th>
            <th>Description</th>
            <th className='w-[10%] text-center'> Action</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design, index) => (
            <tr key={design.Id} style={{backgroundColor:index%2==0?'#f7f8fc':'white'}}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://localhost/Backend/DesignImage/${design.image}`}
                  alt={design.Name}
                  style={{ width: '100px', height: '100px',objectFit:'cover' }}
                />
              </td>
              <td>{design.Name}</td>
              <td>{design.Height}</td>
              <td>{design.Width}</td>
              <td>{design.Description}</td>
              <td>
                <button className='bg-[red] text-white py-[0.5vw] px-[2vw] text-[0.9vw] rounded-[4vw]' onClick={() => handleDelete(design.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowDesign;
