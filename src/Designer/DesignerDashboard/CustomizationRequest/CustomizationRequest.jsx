import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomizationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    fetchCustomizationRequests();
  }, []);

  const fetchCustomizationRequests = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const designerId = user ? user.id : null;

    if (!designerId) {
      alert('Designer ID is missing');
      return;
    }

    try {
      const response = await axios.post('http://localhost/Backend/getCustomizationRequests.php', { designerId });
      if (response.data.status === 'success') {
        setRequests(response.data.requests);
      } else {
        alert(response.data.message || 'Error fetching requests');
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Error fetching requests');
    }
  };

  const handleImageChange = (event, requestId) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImages((prevState) => ({
        ...prevState,
        [requestId]: file,
      }));
    }
  };
  const handleUploadImage = async (requestId) => {
    const image = selectedImages[requestId];
    if (!image) {
      alert('Please select an image');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('requestId', requestId);
  
    try {
      const response = await axios.post('http://localhost/Backend/uploadCustomizationImage.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.data.status === 'success') {
        alert('Image uploaded successfully');
        fetchCustomizationRequests(); // Optionally, refresh the list after upload
      } else {
        alert('Error uploading image: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };
  

  return (
    <div>
      <table className="w-[100%] text-center">
        <thead className="bg-[black] text-[white] text-[1vw] h-[3vw]">
          <tr>
            <th>S.No</th>
            <th>User ID</th>
            <th>Width</th>
            <th>Height</th>
            <th>Color</th>
            <th>Price</th>
            <th>Description</th>
            <th className='w-[40%]'>Upload Image</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.Id} className="w-[100%] h-[2vw]" style={{backgroundColor:index%2==0?'#f7f8fc':''}}>
              <td>{index + 1}</td>
              <td>{request.UserId}</td>
              <td>{request.Width}</td>
              <td>{request.Height}</td>
              <td>{request.Color}</td>
              <td>{request.Price}</td>
              <td>{request.Description}</td>
              <td>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, request.Id)}
                  accept="image/*" className='w-[50%] text-[0.7vw]'
                />
                <button onClick={() => handleUploadImage(request.Id)} className='bg-[#20c461] ml-[1vw] text-white px-[1vw] py-[0.5vw] '>Upload</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomizationRequest;
