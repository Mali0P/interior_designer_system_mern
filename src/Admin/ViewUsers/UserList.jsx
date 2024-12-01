import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/Backend/adminViewUsers.php', { withCredentials: true });

      // Check if response contains users data
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setError('Error fetching users: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      setError('Error fetching users');
      console.error('Fetch error:', err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.post('http://localhost/Backend/deleteUser.php', { Userid: userId }, { withCredentials: true });
      fetchUsers(); // Refresh the list after deletion
    } catch (err) {
      setError('Error deleting user');
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.Userid}>
              {user.username} ({user.email}) - Role: {user.role}
              <button onClick={() => handleDelete(user.Userid)} style={{ marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
