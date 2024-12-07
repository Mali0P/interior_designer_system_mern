import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar/Navbar'
export default function ShowResponse() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userData) {
      const userId = userData.id; // Get UserId from localStorage

      fetch(`http://localhost/Backend/getCustomizationResponse.php?UserId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies if necessary
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            setHistory(data.history); // Store customization history in state
          } else {
            setError(data.message || 'No customization history found');
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
    <div className="w-[100%] h-[140vh] bg-[#f1f1f1] flex px-[10.1vw] justify-center items-center">
        <NavBar/>
      <div className="historyContent bg-[white] w-[100%] h-[80%] py-[3vw] px-[5vw]">
        <h2 className="text-2xl font-bold mb-[2vw]">Your Customization History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index} className="border-b py-2">
                <h3 className="text-lg font-semibold">Customization #{item.Id}</h3>
                <p>UserId: {item.UserId}</p>
                <p>DesignerId: {item.DesignerId}</p>
                <p>Width: {item.Width}m</p>
                <p>Height: {item.Height}m</p>
                <p>Color: {item.Color}</p>
                <p>Price: Rs {item.Price}</p>
                <p>Description: {item.Description}</p>
                {item.imageName && (
                  <img
                    src={`http://localhost/Backend/customization_images/${item.imageName}`}
                    alt="Custom Design"
                    className="w-full h-auto my-2"
                  />
                )}
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
