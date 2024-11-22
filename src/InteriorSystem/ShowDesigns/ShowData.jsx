import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ShowData() {
  const [fetchDesignsApi, setFetchDesignsApi] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setFetchDesignsApi(response.data.products); 
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className='w-[100vw] h-[88vw] bg-[#f6f7fb] flex justify-center items-center relative flex-col'>
      <div className="showData w-[80%] h-[80%] py-[2vw] bg-[#f6f7fb] ">
        <div className="categoriesDiv">
          <h2 className='text-[3.4vw] font-[600]'>Choose Category</h2>
          <p className='text-[0.8vw] font-[500] mt-[0.4vw] leading-[1.1vw]'>
            "Explore our curated categories to find the perfect design inspiration for your space. Whether you're drawn to <br />
            sleek modern lines, cozy rustic charm, or vibrant bohemian flair, each category offers a unique glimpse into various styles<br />
            and room types. Select a category to discover tailored ideas that bring your vision to life."
          </p>
          <ul className='flex gap-[1vw] mt-[1.2vw]'>
            {['All Categories', 'Modern', 'Aesthetic', 'Traditional', 'Colorful', 'B&W'].map((category, index) => (
              <li key={index} style={{background:index===0?'black':'',color:index===0?'white':''}} className='text-[0.7vw] border-[0.1vw] border-[black] rounded-[100vw] px-[1.2vw] py-[0.5vw]'>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="showDesigns grid w-[100%] h-[85%] mt-[2vw] grid-cols-[30%,30%,30%] gap-[0.9vw] flex items-center justify-center relative">
          {fetchDesignsApi.slice(7, 13).map((val, id) => (
            <div key={id} className="designItem w-[100%] h-[90%] border bg-white shadow-md relative">
              <img src={val.thumbnail} alt={val.title} className=" w-[100%] h-[80%] object-cover mb-[1vw] rounded " />
              <h3 className='text-[1vw] font-semibold'>{val.title}</h3>
              <p className='text-[0.8vw]'>{val.category}</p>
            </div>
          ))}
        </div>

      </div>
      <div className="pagination w-[80%] bg-[] h-[4%] mt-[2vw] text-[black] flex justify-center items-center">
        <ul className='text-center flex gap-[1.2vw]'>
           {[1,2,3,4,5].map((val,id)=>
        <li className='border px-[0.9vw] py-[0.5vw] border-[0.1vw] rounded-[100vw] text-[0.8vw] font-[600]'> {id+1}</li>
        )}
        </ul>
      </div>
    </div>
  );
}
