import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Links } from 'react-router-dom'; // Import Link
import Navbar from '../Navbar/Navbar';

export default function ShowData() {
  const [fetchDesignsApi, setFetchDesignsApi] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(6); // Number of items per page

  // Fetch designs and categories from backend
  const fetchApi = async () => {
    try {
      const response = await axios.get('http://localhost/Backend/getAllDesigns.php');
      setFetchDesignsApi(response.data.designs);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching designs and categories:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchApi();
  }, []);

  // Filter designs based on selected category
  const filteredDesigns = selectedCategory === 'All Categories'
    ? fetchDesignsApi
    : fetchDesignsApi.filter(design => design.Category === selectedCategory);

  // Get designs for the current page
  const indexOfLastDesign = currentPage * itemsPerPage;
  const indexOfFirstDesign = indexOfLastDesign - itemsPerPage;
  const currentDesigns = filteredDesigns.slice(indexOfFirstDesign, indexOfLastDesign);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredDesigns.length / itemsPerPage);

  return (
    <div className="w-[100vw] h-[88vw] bg-[#f6f7fb] flex justify-center items-center relative flex-col">
      <Navbar />
      <div className="showData w-[80%] h-[80%] py-[2vw] bg-[#f6f7fb]">
        <div className="categoriesDiv">
          <h2 className="text-[3.4vw] font-[600]">Choose Category</h2>
          <p className="text-[0.8vw] font-[500] mt-[0.4vw] leading-[1.1vw]">
            "Explore our curated categories to find the perfect design inspiration for your space. Whether you're drawn to <br />
            sleek modern lines, cozy rustic charm, or vibrant bohemian flair, each category offers a unique glimpse into various styles<br />
            and room types. Select a category to discover tailored ideas that bring your vision to life."
          </p>
          <ul className="flex gap-[1vw] mt-[1.2vw]">
            {['All Categories', ...categories].map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category)} // Set selected category on click
                style={{
                  background: category === selectedCategory ? 'black' : '',
                  color: category === selectedCategory ? 'white' : '',
                  cursor: 'pointer', // Add cursor pointer to indicate clickable
                }}
                className="text-[0.7vw] border-[0.1vw] border-[black] rounded-[100vw] px-[1.2vw] py-[0.5vw]"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="showDesigns grid w-[100%] h-[85%] mt-[2vw] grid-cols-[30%,30%,30%] gap-[0.9vw] flex items-center justify-center relative">
          {currentDesigns.map((design, id) => (
            <div
              key={id}
              className="designItem w-[100%] h-[90%] border bg-white shadow-md relative" 
              style={{ cursor: 'pointer' }}
            >
             
              <Link to={`/design/${design.id}`}> 
             
                <img
                  src={`http://localhost/Backend/DesignImage/${design.image}`}
                  alt={design.Name}
                  className="w-[100%] h-[73%] object-cover mb-[1vw] rounded"
                />
                <h3 className="text-[1vw] font-semibold px-[1vw]">{design.Name}</h3>
                <p className="text-[0.8vw] px-[1vw]">{design.Category}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination w-[80%] bg-[] h-[4%] mt-[2vw] text-[black] flex justify-center items-center">
        <ul className="text-center flex gap-[1.2vw]">
          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, pageIndex) => (
            <li
              key={pageIndex}
              onClick={() => paginate(pageIndex + 1)} // Navigate to the clicked page
              className={`border px-[0.9vw] py-[0.5vw] border-[0.1vw] rounded-[100vw] text-[0.8vw] font-[600] ${currentPage === pageIndex + 1 ? 'bg-black text-white' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {pageIndex + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
