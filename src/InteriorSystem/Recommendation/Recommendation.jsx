import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (userData) {
      const userId = userData.id;  // Extract UserId from localStorage
      fetch(`http://localhost/Backend/recommendationAlgorithm.php?UserId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies) if necessary
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            setRecommendations(data.recommendations); // Process the data
          } else {
            setError(data.message || 'Error fetching recommendations');
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching recommendations:', err);
          setError('Failed to fetch recommendations');
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
      <Navbar />
      <div className="historyContent bg-[white] w-[100%] h-[80%] py-[3vw] px-[5vw]">
        <h2 className="text-2xl font-bold mb-[2vw]">Recommended Customizations</h2>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.slice(0,1).map((item, index) => (
              <li key={index} className="border-b py-2">
                <h3 className="text-lg font-semibold">Customization #{item.Id}</h3>
                <p>UserId: {item.UserId}</p>
                <p>DesignerId: {item.DesignerId}</p>
                <p>Width: {item.Width}m | Height: {item.Height}m</p>
                <p>Color: {item.Color}</p>
                <p>Price: Rs {item.Price}</p>
                <p>Description: {item.Description}</p>
                {item.imageName && <img src={`http://localhost/Backend/DesignImage/${item.imageName}`} alt="Custom Design" className="w-full h-auto my-2" />}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
}
