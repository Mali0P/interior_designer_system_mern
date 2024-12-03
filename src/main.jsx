import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './Admin/login/AdminLogin.jsx';
import IndividualDesign from './InteriorSystem/Individualdesign/IndividualDesign.jsx';
import Signup from '../src/InteriorSystem/login/Signup.jsx';
import Login from './InteriorSystem/login/Login.jsx';
import DesignerDashbord from './Designer/DesignerDashboard/DesignerDashbord.jsx';
import ShowDesign from './Designer/DesignerDashboard/showDesign/ShowDesign.jsx';
import AdminHomepage from './Admin/AdminHomepage.jsx'
import ShowData from './InteriorSystem/ShowDesigns/ShowData.jsx';
import Customization from './InteriorSystem/Individualdesign/Customization.jsx';
import ShowHistory from './InteriorSystem/ShowHistory/ShowHistory.jsx';
// Define your routes using createBrowserRouter
let allRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'design/:id',
    element: <IndividualDesign />,
  }
  ,
  {
    path: 'signup',
    element: <Signup/>,
  }
  ,
  {
    path: 'login',
    element: <Login/>,
  }
  ,
  {
    path:'designer/dashboard',
    element:<DesignerDashbord/>
  },
  {
    path:'upload',
    element:<ShowDesign/>
  },
  {
    path:'admin',
    element: <AdminHomepage/>

  }
  ,
  {
    path:'admin/login',
    element:<AdminLogin/>
  }
  ,
  {
    path:'viewdesigns',
    element:<ShowData/>
  }
  ,
  {
    path:'customization',
    element:<Customization/>
  }
  ,
  {
    path:'history',
    element:<ShowHistory/>
  }
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
);
