import { useState } from "react";
import { FaShoppingCart, FaUser,FaSearch } from "react-icons/fa";
import logo from '../../assest/logo-trans.png';
import {MdArrowDropDown,MdArrowDropUp} from 'react-icons/md';
import {ImMenu3,ImMenu4} from 'react-icons/im'; 
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const [isUser,setUser] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setMenuIsOpen(!isMenuOpen);
  const toggleProduct = () => setIsOpen(!isOpen);
  const toggleUser = () => setUser(!isUser)

  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <nav className="sticky top-0 bg-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img
              className="h-14 mr-3"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to={'/'}
                className=" text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                Home
              </Link>

              <div className="relative"  >
                <button onClick={toggleProduct}  type="button"
                  className=" flex text-white px-3 py-2 rounded-md text-xl font-medium"
                  >
                  Products  
                  {isOpen ? ( 
                  <MdArrowDropUp className="ml-2 h-8 w-5" />)  : (
                    <MdArrowDropDown className="ml-2 h-8 w-5" />)}
                  </button>
        
                {isOpen  && (
                  <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-3"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                         to={'/'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Catgory
                      </Link>

                      <Link
                        to={'/'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Age
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to={'aboutus'}
                className=" text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                About Us
              </Link>
              <Link
                to={'contact'}
                className=" text-white px-3 py-2 rounded-md text-xl font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
            <div className="relative right-5">
            <span className="absolute inset-y-0 left-0 right-5 pl-3 flex items-center">
              <FaSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className=" w-full py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>    
              <button
                type="button"
                className="bg-red-500 p-1 rounded-full text-white-400 hover:text-white"
              >
                <FaShoppingCart size={20}/> 
              </button>

              {user ? 
              (<button
                    type="button"
                    className="bg-red-500 p-1 rounded-full text-white-400 hover:text-white ml-4"
                    onClick={toggleUser}
                  >
                    <FaUser size={20} />
                {isUser &&(
                  <ul className="absolute z-10 right-10 mt-2 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="flex">
                      <Link
                        to="/"
                        className="px-12 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Profile
                      </Link>
                    </div>
                    <div className="flex">
                      <Link
                        to="/"
                        className="px-12 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                       LogOut
                      </Link>
                    </div>
                  </ul>
                )}
                </button>)
              :( 
                <button
                type="button"
                className="bg-red-500 p-1 rounded-full text-white-400 hover:text-white  ml-4"
                ><Link to={'signin'}> <FaUser size={20} /></Link></button>
              )
              }
              <button
                type="button"
                className="bg-red-500 p-1 rounded-full text-white-400 hover:text-white  ml-4"
              >
              </button>
            </div>
          </div>
            
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black-400 hover:text-white hover:bg-white-700 "
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <ImMenu3 size={25}/>
              ) : (
                <ImMenu4 size={25}/>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 right-5 pl-3 flex items-center rounded">
              <FaSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className=" w-full py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>  
            <Link
              href="#"
              className="hover:bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            
            <div className="relative">
              <button
                onClick={toggleProduct}
                type="button"
                className="hover:bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Products
              
              </button>
              {isOpen && (
                  <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-3"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <Link
                         to={'/'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Catgory
                      </Link>

                      <Link
                        to={'/'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Age
                      </Link>
                    </div>
                  </div>
                )}
         
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <button
                type="button"
                className=" p-1 rounded-full text-black-400 hover:text-white"
              >
                <FaShoppingCart size={20}/>
              </button>

              <button
                type="button"
                className=" p-1 rounded-full text-white-400 hover:text-white  ml-4"
              >
                <Link to={'signin'}> <FaUser size={20} /></Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
