import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import IndividualDesign from './InteriorSystem/Individualdesign/IndividualDesign.jsx';
import Signup from '../src/InteriorSystem/login/Signup.jsx';
import Login from './InteriorSystem/login/Login.jsx';
import DesignerDashbord from './Designer/DesignerDashboard/DesignerDashbord.jsx';
import UploadDesign from './Designer/uploadDesign.jsx';
import ShowDesign from './Designer/DesignerDashboard/showDesign/ShowDesign.jsx';

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
  }
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
);
