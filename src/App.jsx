import React from 'react'
import Homepage from './InteriorSystem/Homepage/Homepage'
import Navbar from './InteriorSystem/Navbar/Navbar'
import AboutUs from './InteriorSystem/DesignerList/Designerlist'
import Design from './InteriorSystem/Designs/Design'
import DesignerHomeList from './InteriorSystem/DesignerHomeList/DesignerHomeList'
import Contactus from './InteriorSystem/ContactUs/Contactus'
import Login from './InteriorSystem/login/Login'
import ShowData from './InteriorSystem/ShowDesigns/ShowData'
import IndividualDesign from './InteriorSystem/Individualdesign/IndividualDesign'
import Signup from './Designer/Designerlogin/signup'
import DesignerDashbord from './Designer/DesignerDashboard/DesignerDashbord'
import Adminsignup from './Admin/Adminsignup'
import AdminHomepage from './Admin/AdminHomepage'
export default function App() {
  return (
    <div>
<Navbar/>

<Homepage/>
<Design/>
<DesignerHomeList/>
<AboutUs/>
<Contactus/>

    </div>
  )
}
