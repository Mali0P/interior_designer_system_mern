import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ShowResponse from './ShowResponse';

export default function ShowHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userData) {
      const userId = userData.id;

      fetch(`http://localhost/Backend/getCustomizationHistoryUser.php?UserId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            setHistory(data.history);
          } else {
            setError(data.message || 'Error fetching customization history');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching customization history:', err);
          setError('Failed to fetch customization history');
          setLoading(false);
        });
    } else {
      setError('No user data found in localStorage');
      setLoading(false);
    }
  }, [userData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[100vw] h-[150vh] py-[4vw] bg-[#f1f1f1] flex flex-col px-[10.1vw] justify-center items-center">
      <Navbar />
      <div className="historyContent bg-white w-[80%] h-[80%] py-[3vw] px-[5vw]" style={{overflowY:'scroll'}}>
        <h2 className="text-2xl font-bold mb-[2vw]">My Customization Request</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index} className="border-b py-2">
                <p className='text-[1.4vw] font-[600]'>Customization Request : {index+1}</p>
                <p>Width: {item.Width} m</p>
                <p>Height: {item.Height} m</p>
                <p>Color: {item.Color}</p>
                <p>Price: Rs {item.Price}</p>
                <p>Description: {item.Description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No customizations found.</p>
        )}
      </div>
    
    </div>
  );
}
