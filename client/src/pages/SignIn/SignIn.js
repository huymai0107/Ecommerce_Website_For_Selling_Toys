import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux"
import "./SignIn.css"
function SignIn() {
  const [error,setError]=useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
    const newUser ={
      username: username,
      password: password,
    }
    const response = await loginUser(newUser,dispatch, navigate);
    navigate("/");}
    catch(err){
      setError(err.toString().replace('Error:',''))
    }
  };

      
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
      {error?<label className="signup-link">{error}</label>:null}          

      <p className="signup-link">Don't have an account? <Link to="/signup">Signup</Link></p>

          </form>
          </>
  );
};




export default SignIn