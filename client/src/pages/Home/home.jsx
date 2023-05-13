import React, { useEffect } from 'react'
import { getAllUsers } from '../../redux/apiRequest'
import {useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom";
import "./home.css"
// const home = () => {
//   const dispatch = () => useDispatch();
//   const user = useSelector((state) => state.auth.login.currentUser);
//  useEffect(() =>{
//   getAllUsers(user.accessToken, dispatch);
//  },[])
//   return (
//     <div>
//       <h1>HOME</h1>
//       {user.username}
//     </div>
//   )
// }

// export default home


const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //DUMMY DATA
  const userData = useSelector((state) => state.user.users?.allUsers);
 useEffect(() =>{
  if(!user){
    navigate("/signin");
  }
  if(user?.accessToken)
  { console.log(user.accessToken)
    getAllUsers(user?.accessToken, dispatch);}
 },[]);
 
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userData?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
