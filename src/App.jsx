import React from 'react'
import Homepage from './InteriorSystem/Homepage/Homepage'
import Navbar from './InteriorSystem/Navbar/Navbar'
import AboutUs from './InteriorSystem/DesignerList/Designerlist'
import Design from './InteriorSystem/Designs/Design'
import DesignerHomeList from './InteriorSystem/DesignerHomeList/DesignerHomeList'
export default function App() {
  return (
    <div>
      <Navbar/>
<Homepage/>
<Design/>
<DesignerHomeList/>
<AboutUs/>


    </div>
  )
}
