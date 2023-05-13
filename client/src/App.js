// import Announcement from './component/Announcement/Announcement';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      {/* <Announcement/>  */}
      <Navbar/>
        <Outlet/> 
      <Footer/> 
    </>
  );
}

export default App;
