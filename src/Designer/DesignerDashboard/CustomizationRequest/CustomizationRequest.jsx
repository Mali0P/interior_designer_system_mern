import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomizationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  // Get the logged-in Designer ID from localStorage
  const designerId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    // Fetch customization requests for the designer based on the Designer ID
    const fetchRequests = async () => {
      try {
        const response = await axios.post('http://localhost/Backend/getCustomizationRequests.php', { designerId });

        // Check if the API response is successful
        if (response.data.status === 'success') {
          setRequests(response.data.requests);  // Store the customization requests
        } else {
          setError('No customization requests found.');
        }
      } catch (error) {
        console.error('Error fetching customization requests:', error);
        setError('Error fetching customization requests.');
      }
    };

    // Fetch the requests when the component mounts
    fetchRequests();
  }, [designerId]);

  return (
    <div className="customization-requests">
      <h2>Customization Requests</h2>

      {error && <p>{error}</p>}

      {requests.length > 0 ? (
        <table className="requests-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>User ID</th>
              <th>Design ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.Id}>
                <td>{index + 1}</td>
                <td>{request.UserId}</td>
                <td>{request.DesignId}</td>
                <td>{request.Description}</td>
                <td>${request.Price}</td>
                <td>{request.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests available for this designer.</p>
      )}
    </div>
  );
};

export default CustomizationRequest;
