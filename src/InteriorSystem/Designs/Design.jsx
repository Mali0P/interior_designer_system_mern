import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Design() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recent designs from the backend
  useEffect(() => {
    axios.get('http://localhost/Backend/getDesigns.php') // Adjust the endpoint if necessary
      .then(response => {
        if (response.data.status === 'success') {
          setDesigns(response.data.designs); // Store fetched designs in state
        } else {
          setError(response.data.message); // Handle errors from the backend
        }
      })
      .catch(error => {
        setError('Error fetching designs. Please try again later.');
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  }, []);

  // Display a loading message until the data is fetched
  if (loading) {
    return <div className="text-center mt-10">Loading designs...</div>;
  }

  // Display an error message if there's a problem fetching data
  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  // Render the fetched designs
  return (
    <div className='homeDesign w-[100vw] h-[30vw] bg-white px-[5vw] py-[3vw] bg-[#f5f5f5] text-black'>
      <div className="topHeading mb-[1vw] flex justify-between items-end pr-[1vw]">
        <div className="designContents">
          <p className='font-[300] text-[1vw]'>Interior Designer System</p>
          <h2 className='text-[2.5vw] font-[400]'>Recent Designs</h2>
        </div>
        <div className="showAllDesigns">
          <button className='text-[0.6vw] font-[600] bg-black text-white border rounded-[100vw] px-[1.3vw] py-[0.6vw] border-black'>
            View More
          </button>
        </div>
      </div>
      <div className="displayDesigns">
        <ul className='flex gap-[1vw]'>
          {designs.map((design) => (
            <li className='relative w-[50%] flex flex-col justify-top items-center' key={design.Id}>
              <Link to={`/design/${design.Id}`}>
        <img
  src={`http://localhost/Backend/DesignImage/${design.image}`}  // Uses 'DesignImage' folder path
  alt={design.Name}
  className='w-[100%] h-[200px] object-cover'
  onError={(e) => { e.target.src = '/placeholder.jpg'; }}  // Optional fallback image
/>

                <h2 className='text-center mt-[1vw]'>{design.Name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
