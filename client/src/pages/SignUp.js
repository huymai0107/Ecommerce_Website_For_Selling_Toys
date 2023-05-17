import React, { useState } from 'react'
import loginSignupImage from '../assest/person.png'
import {BiShow, BiHide} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../util/ImagetoBase64'; 
import { useDispatch, useSelector} from "react-redux"
import { registerUser } from '../redux/apiRequest';
import { Notify } from '../util/Notify';
import { ToastContainer } from 'react-toastify';

function Signup() {
  const[showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () =>{
    setShowPassword(preve => !preve)
  }

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowConfirmPassword =() =>{
    setShowConfirmPassword(preve => !preve)
  }

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.auth.login?.currentUser);

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)
    setData((preve)=>{
        return{
          ...preve,
          image : data
        }
    })
}
const resetForm = () => {
  setData({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: ''
  });
};

  const handleSubmit = async(e) => {
    e.preventDefault()
    const{userName, email,password,confirmPassword,image} = data 
    if(email && password && confirmPassword){
      if(password === confirmPassword){
        const newUser ={
          username: userName,
          email: email,
          password: password,
          image:image
        }
        registerUser(newUser,dispatch, navigate); 
        resetForm();
       
      }
      else{
        await Notify("Password and confirm password not the same")
      }
      }
      else{
        await Notify("Please enter required field")
      }
    }
  return (
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-2'> 
        {/* <h1 className='text-center text-2xl font-bold'> Signup</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={data.image ? data.image :  loginSignupImage} alt='' className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='userName'>UserName</label>
          <input type={'text'} id='userName' name='userName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded' value={data.userName}  onChange={handleOnChange}/>
         
          <label htmlFor='email'>Email </label>
          <input type={'email'} id='email' name='email' className='mt-1 mb-2  w-full bg-slate-200 px-2 py-1 rounded' value={data.email}  onChange={handleOnChange}/>
          
          <label htmlFor='password'>Password </label>
          <div className='flex px-2 py-1 mt-1 bg-slate-200 mb-2 rounded outline-2 focus-within:outline-blue-300'> 
          <input type={ showPassword ? 'text':'password'} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password}  onChange={handleOnChange} />
          <span className='flex text-xl'onClick={handleShowPassword}>{ showPassword ?<BiShow/> :<BiHide/>}</span>
          </div>

          <label htmlFor='confirmPassword'>Confirm password </label>
          <div className='flex px-2 py-1 mt-1 bg-slate-200 mb-2 rounded outline-2 focus-within:outline-blue-300'> 
          <input type={ showConfirmPassword ? 'text':'password'} id='confirmppassword' name='confirmPassword' className='w-full bg-slate-200 border-none outline-none' value={data.confirmPassword}  onChange={handleOnChange}/>
          <span className='flex text-xl'onClick={handleShowConfirmPassword}>{ showConfirmPassword ?<BiShow/> :<BiHide/>}</span>
          </div>
          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4" type='submit'>
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
    </div>
    <ToastContainer/>  
  </div>
  
  )
}

export default Signup