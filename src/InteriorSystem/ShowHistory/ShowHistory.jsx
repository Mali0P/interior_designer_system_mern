import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

export default function ShowHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userData) {
      const userId = userData.id;  // Extract UserId from localStorage

      // Fetch user's customization history using the UserId from localStorage
      fetch(`http://localhost/Backend/getCustomizationHistory.php?UserId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Include credentials (cookies)
      })
        .then((response) => response.json())  // Directly parse as JSON
        .then((data) => {
          if (data.status === 'success') {
            setHistory(data.history);  // Assume the response has a 'history' array
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
    <div className="w-[100vw] h-[140vh] bg-[#f1f1f1] flex px-[10.1vw] justify-center items-center">
      <Navbar />
      <div className="historyContent bg-white w-[80%] h-[80%] py-[3vw] px-[5vw]">
        <h2 className="text-2xl font-bold mb-[2vw]">Your Customization History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index} className="border-b py-2">
                <h3 className="text-lg font-semibold">Customization #{item.Id}</h3>
                <p>Width: {item.Width}m | Height: {item.Height}m</p>
                <p>Color: {item.Color}</p>
                <p>Price: Rs {item.Price}</p>
                <p>Description: {item.Description}</p>
                <p className="text-gray-500">Customized on: {new Date(item.Date).toLocaleDateString()}</p>
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
