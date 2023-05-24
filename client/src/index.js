import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'; 
import SignIn from './pages/SignIn';
import Signup from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Order from './pages/Order';
import Product from './pages/Product';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element={<App/>} >
      <Route path='' element={<Home/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='aboutus' element={<AboutUs/>}/>
      <Route path='contact' element={<ContactUs/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='checkout' element={<CheckOut/>}/>
      <Route path='order' element={<Order/>}/>
      <Route path='/product/:id' element={<Product/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <PersistGate loading={null} persistor={persistor}>
   <RouterProvider router={router} />
   </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();