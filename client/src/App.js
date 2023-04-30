import Announcement from './component/Announcement/Announcement';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Announcement/> 
      <Navbar/>
      <main className="pt-16 white min-w-h-[calc(100vh)]">
      <Outlet/> 
      </main>
      <Footer/> 
    </div>
  );
}

export default App;
