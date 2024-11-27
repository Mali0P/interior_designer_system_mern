import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Design from './InteriorSystem/Designs/Design.jsx';
import Login from './InteriorSystem/login/Login.jsx';
import IndividualDesign from './InteriorSystem/Individualdesign/IndividualDesign.jsx';
import Signup from './Signup/Signup.jsx';

// Define your routes using createBrowserRouter
let allRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'design/:id',
    element: <IndividualDesign />,
  },
  {
    path: 'login',
    element: <Login />,
  }
  ,
  {
    path: 'signup',
    element: <Signup/>,
  }
  ,
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>
);
