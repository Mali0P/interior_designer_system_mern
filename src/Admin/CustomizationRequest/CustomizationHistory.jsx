import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomizationHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/Backend/getCustomizationHistoryAdmin.php')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching customization history:', error);
      });
  }, []);

  return (
    <div className='w-[100%]'>
      <h2 className='font-[600] text-[1.2vw]'>Customization History</h2>
      <table className='w-[100%] text-center'>
        <thead>
          <tr className='bg-[black] text-white h-[3vw] text-[1vw]'>
            <th>UserId</th>
            <th>DesignerId</th>
            <th>Width</th>
            <th>Height</th>
            <th>Color</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item,index) => (
            <tr key={item.id} className='h-[5vw]' style={{backgroundColor:index%2==0?'#e5e5e5':''}}>
              <td>{item.UserId}</td>
              <td>{item.DesignerId}</td>
              <td>{item.Width}</td>
              <td>{item.Height}</td>
              <td>{item.Color}</td>
              <td>{item.Price}</td>
              <td>{item.Description}</td>
              <td className='m-auto flex justify-center py-2'>
                {console.log(item)}
                <img 
                  src={`http://localhost/Backend/customization_images/${item.imageName}`} 
                  alt="Customization"
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
