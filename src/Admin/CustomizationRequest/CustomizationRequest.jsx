import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomizationRequest() {
  const [customizations, setCustomizations] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost/Backend/getCustomizations.php') // Replace with your endpoint
      .then(response => {
        setCustomizations(response.data);
      })
      .catch(error => {
        console.error('Error fetching customizations:', error);
      });
  }, []);

  return (
    <div className='w-[100%]'>
      <h2 className='font-[600] text-[1.5vw] my-[0.5vw]'>Recent Customization Requests</h2>
      <table className='w-[100%] text-center'>
        <thead className='bg-[black] text-white text-[1.1vw] h-[3vw]'>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>DesignerId</th>
            <th>Width</th>
            <th>Height</th>
            <th>Color</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {customizations.map((customization,id) => (
            <tr key={customization.Id} className='h-[4vw]' style={{backgroundColor:id%2==0?'#e5e5e5':''}}>
              <td>{customization.Id}</td>
              <td>{customization.UserId}</td>
              <td>{customization.DesignerId}</td>
              <td>{customization.Width}</td>
              <td>{customization.Height}</td>
              <td>{customization.Color}</td>
              <td>{customization.Price}</td>
              <td>{customization.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
