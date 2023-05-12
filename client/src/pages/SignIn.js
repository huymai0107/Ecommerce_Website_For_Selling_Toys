import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux"
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
  };
      
  return (
    <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
      {/* <h1 className='text-center text-2xl font-bold'>Login</h1> */}
      {/* <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} alt="" className="w-full" />
      </div> */}

      <form className="w-full py-3 flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input
          type={"text"}
          id="username"
          name="username"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
          <input
            id="password"
            name="password"
            className=" w-full bg-slate-200 border-none outline-none "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
          Login
        </button>
      </form>
      {/* <p className="text-left text-sm mt-2">
        Don't  have account ?{" "}
        <Link to={"/signup"} className="text-red-500 underline">
          Sign Up
        </Link>
      </p> */}
    </div>
    </div>
  )
}

export default SignIn