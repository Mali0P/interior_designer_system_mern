import React, { useEffect, useState } from 'react';
import UserList from './ViewUsers/UserList';
import { useNavigate } from 'react-router-dom';
export default function AdminHomepage() {
  const [counts, setCounts] = useState({ users: 0, designers: 0, designs: 0 });
  const [categories, setCategories] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Fetch counts, categories, and designs on load
  useEffect(() => {
    fetch('http://localhost/Backend/getCounts.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setCounts(data.counts);
        }
      })
      .catch(error => console.error('Error fetching counts:', error));

    fetch('http://localhost/Backend/getCategories.php')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.categories);
        }
      })
      .catch(error => console.error('Error fetching categories:', error));

    fetch('http://localhost/Backend/getDesigns.php') // Replace with your endpoint
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setDesigns(data.designs);
        }
      })
      .catch(error => console.error('Error fetching designs:', error));
  }, []);

  // Handle category addition
  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      alert("Category name is required");
      return;
    }
    fetch('http://localhost/Backend/addCategory.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCategory })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert(data.message);
          setCategories([...categories, { Category: newCategory }]);
          setNewCategory("");
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error adding category:', error));
  };

  // Handle design deletion
  const handleDeleteDesign = (designId) => {
    fetch('http://localhost/Backend/deleteDesignAdmin.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id: designId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert(data.message);
          setDesigns(designs.filter(design => design.Id !== designId));
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error deleting design:', error));
  };
 

    const navigate = useNavigate();
  
    const logout = () => {
      fetch('http://localhost/Backend/adminlogout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Ensure session cookies are sent
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            navigate('/admin/login'); // Redirect to login page using navigate
          } else {
            alert('Error logging out');
            navigate('/admin/login'); 
          }
        })
        .catch((error) => {
          console.error('Error logging out:', error);
          alert('Error logging out');
        });
    };
  

  return (
    <div className='w-[100vw] min-h-[100vh] flex'>
      <div className="leftDashboard bg-[white] w-[22vw] h-[100%] fixed top-0 left-0">
        {/* Sidebar */}
        <div className="leftIcon bg-[#3d4b65] w-[100%] h-[100%] flex flex-col justify-between py-[3vw] px-[2vw] items-center">
          <ul className='text-[white] text-[1vw] flex flex-col gap-[1vw]'>
            <li className='text-[2vw] font-[500] border-b pb-[1vw]'>Interior Designer System / Admin</li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#showCategories">Add Category</a></li>
            <li><a href="#designs">Designs</a></li>
            <li onClick={logout} className='cursor-pointer'>Logout</li>
          </ul>
        </div>
      </div>

      <div className="rightDashboard w-[78vw] ml-[22vw] px-[3vw] py-[2vw] bg-[#f2f2f2]">
        {/* Counts Section */}
        <h3 className='text-[1.4vw] font-[500] mb-[1vw]' id='dashboard'>IDS / Admin Dashboard</h3>
        <div className="dashBoard grid grid-cols-3 gap-8 h-[18vw]">
          <div className="bg-[#25b6cb] flex justify-center items-center flex-col text-white text-center py-4 rounded">
            <h2 className='text-[3vw] font-bold'>{counts.users}</h2>
            <p className='text-[1.2vw]'>Total Users</p>
          </div>
          <div className="bg-[#e44542] flex justify-center items-center flex-col text-white text-center py-4 rounded">
            <h2 className='text-[3vw] font-bold'>{counts.designers}</h2>
            <p className='text-[1.2vw]'>Total Designers</p>
          </div>
          <div className="bg-[#52a555] flex justify-center items-center flex-col text-white text-center py-4 rounded">
            <h2 className='text-[3vw] font-bold'>{counts.designs}</h2>
            <p className='text-[1.2vw]'>Total Designs</p>
          </div>
        </div>

        {/* Add Category Section */}
        <div id="showCategories" className='mt-[2vw] bg-white p-6 rounded'>
          <h2 className='text-[2vw] font-bold mb-4'>Add a New Category</h2>
          <div className="flex">
            <input
              className='w-[50%] p-2 border rounded'
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button className='bg-[#3598db] text-white px-6 py-2 ml-4 rounded' onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </div>

       
        <div id='designs' className="designs bg-white mt-4 rounded p-4">
          <h3 className='text-[1.5vw] font-bold mb-4'>Our Designs</h3>
          <ul>
            <li className='bg-[black] border-b py-4 text-[white] text-[1vw] px-[1vw] mb-[1vw] grid grid-cols-11'>
           
                <p>Designer ID</p>
                <p>Name</p>
                <p>Height</p>
                <p>Width</p>
                <p>Color</p>
                <p>Pattern</p>
                <p>Category</p>
                <p>Description</p>
                <p>Price</p>
                <p>Img</p>
               <p>Action</p>
            </li>
            {designs.map((design) => (
              <li key={design.Id} className='text-[0.6vw] px-[1vw] border-b py-4 mb-[2vw] grid grid-cols-11 h-[7.5vw] overflow-hidden'>
  
                <p>{design.DesignerId}</p>
                <p className='font-[600]'> {design.Name}</p>
                <p>{design.Height} cm</p>
                <p>{design.Width} cm</p>
                <p>{design.Color}</p>
                <p>{design.Pattern}</p>
                <p>{design.Category}</p>
                <p style={{overflowY:'scroll'}}>{design.Description}</p>
                <p>Rs. {design.Price}</p>
                <img 
                  src={`http://localhost/Backend/DesignImage/${design.image}`} 
                  alt={design.Name} 
                  className='w-[200px] h-[150px] object-cover mt-2'
                />
                <button 
                  onClick={() => handleDeleteDesign(design.Id)} 
                  className='mt-2 bg-[red] text-white px-[1vw] py-[0.5vw] rounded h-[20%] m-auto'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="userlist">
          <UserList/>
        </div>
      </div>
    </div>
  );
}
