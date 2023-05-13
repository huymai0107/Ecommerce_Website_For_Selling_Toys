import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux"
import "./SignIn.css"
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) =>{
    e.preventDefault();
    const newUser ={
      username: username,
      password: password,
    }
    loginUser(newUser,dispatch, navigate)
    navigate("/");
  };
      
  return (
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
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
          </form>
  );
};




export default SignIn