import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "./redux/store"
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'; 
import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element={<App/>} >
      <Route path='' element={<Home/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='aboutus' element={<AboutUs/>}/>
      <Route path='contact' element={<ContactUs/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
   <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();