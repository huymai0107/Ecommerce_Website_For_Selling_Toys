import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from "./redux/store"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'; 
import SignIn from './pages/SignIn/SignIn';
import Signup from './pages/SignUp/SignUp';
import Home from './pages/Home/home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element={<App/>} >
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
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
