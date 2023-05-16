import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import {useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./SignIn.css"
function SignIn() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [error,setError]=useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FailNotify = (note) => {
    toast.warn(note, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 2

        });
};
const SuccessNotify = () => {
  toast.success('Successfully Sign-in', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      toastId: 1

      });
};
  // const handleLogin = async (e) =>{
  //   e.preventDefault();
  //   SuccessNotify();
  //   await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 1 second
  //   try{
  //   const newUser ={
  //     username: username,
  //     password: password,
  //   }
  //   const response = await loginUser(newUser,dispatch, navigate);

  //   navigate("/");}
  //   catch(err){
  //     FailNotify(err.toString().replace('Error:',''));

  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const newUser = {
        username: username,
        password: password,
      };
      
      SuccessNotify(); // Show success notification
      
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 3 seconds
      
      const response = await loginUser(newUser, dispatch, navigate);
  
      navigate("/");
    } catch (err) {
      FailNotify(err.toString().replace('Error:', ''));
    }
  };
  useEffect(() =>{
    if(user)
    {
      navigate("/");
    }
   },[]);
      
  return (
    <>

    <form onSubmit={handleLogin} className="signin-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="signin-button">Sign in</button>
      {/* {error?<label className="signup-link">{error}</label>:null}           */}

      <p className="signup-link">Don't have an account? <Link to="/signup">Signup</Link></p>

          </form>
          <ToastContainer></ToastContainer>
          </>
  );
};




export default SignIn