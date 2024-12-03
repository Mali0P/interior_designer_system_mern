import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/Backend/adminViewUsers.php', { withCredentials: true });
      console.log('Fetch response:', response.data);  // Debugging log

      if (response.data.status === 'success' && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setError('Error fetching users: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      setError('Error fetching users');
      console.error('Fetch error:', err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      console.log('Deleting user with ID:', userId);  // Debugging log

      const response = await axios.post(
        'http://localhost/Backend/deleteUser.php',
        { Userid: userId },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log('Delete response:', response.data);  // Debugging log

      if (response.data.status === 'success') {
        fetchUsers();  // Refresh the user list after successful deletion
      } else {
        setError('Error deleting user: ' + response.data.message);
      }
    } catch (err) {
      setError('Error deleting user');
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
       <div id='users' className="designs bg-white mt-4 rounded p-4">
          <h3 className='text-[1.5vw] font-bold mb-4'>User List</h3>
          <ul>
            <li className='bg-[black] border-b py-4 text-[white] text-[1vw] px-[1vw]  grid grid-cols-[10%_22.5%_22.5%_22.5%_22.5%] text-center'>
           
                <p>Sno.</p>
                <p>Username</p>
                <p>Email</p>
                <p>Role</p>
                <p>Action</p>
            
            </li>
       </ul>
        
  
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
      <ul >
          {users.map((user,id) => (
            <li key={user.Userid} className='border-b py-4 text-[black] text-[1vw] px-[1vw] py-[2vw] grid grid-cols-[10%_22.5%_22.5%_22.5%_22.5%] text-center' style={{backgroundColor:id%2==0?'rgb(0,0,0,0.1)':''}}>
           <p>   {id+1}</p>
           <p>   {user.username}</p>
           <p> {user.email} </p> 
           <p style={{textTransform:'capitalize'}}>{user.role}</p>
            <p>  <button onClick={() => handleDelete(user.Userid)} style={{ marginLeft: '10px' }} className='bg-[red] text-[white] px-[1vw] rounded-[0.2vw] text-[0.8vw] py-[0.4vw]'>Delete</button></p>
            </li>
          ))}
          </ul>
      )}
        </div>
    </div>
  );
};

export default UserList;
