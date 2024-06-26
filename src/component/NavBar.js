// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext'; // Adjust the path based on your setup

const NavBar = ({ openLoginModal }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  const handleNavigation = () => {
    navigate('/EnrolmentForm');
  };

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-semibold">MyApp</span>
      </div>
      <div className="flex items-center flex-grow justify-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-grow max-w-xs text-black p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <button 
        onClick={handleNavigation}
        className='bg-white text-blue-600 px-4 py-2 rounded-md ml-4 hover:bg-gray-200 hover:text-blue-900'
        disabled={!currentUser} // Disable button if currentUser is falsy (not logged in)
      >
        Add Data
      </button>
      {!currentUser && (
        <button 
          onClick={openLoginModal} 
          className="bg-white text-blue-600 px-4 py-2 rounded-md ml-4 hover:bg-blue-100"
        >
          Login/Signup
        </button>
      )}
    </nav>
  );
};

export default NavBar;
