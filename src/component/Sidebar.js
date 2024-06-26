// src/Sidebar.js
import React from 'react';
import { FaHome, FaChartBar, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../config/AuthContext'; // Adjust the path based on your setup

const Sidebar = ({ currentView, setCurrentView }) => {
  const { logout, currentUser } = useAuth(); // Get logout function from AuthContext

  const handleLogout = () => {
    logout(); // Call logout function
    // Optionally, redirect user to login or homepage after logout
    // Example using window.location:
  };


  return (
    <aside className="bg-gray-800 text-white w-56 h-full flex flex-col shadow-lg">
      <ul className="flex flex-col p-4">
        <li className="mb-4">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex items-center p-2 w-full text-left rounded-md ${currentView === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FaHome className="mr-2" /> Home
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setCurrentView('reports')}
            className={`flex items-center p-2 w-full text-left rounded-md ${currentView === 'reports' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FaChartBar className="mr-2" /> Reports
          </button>
        </li>
        <li className="mb-4">
          <button
            // onClick={() => setCurrentView('profile')}
            className={`flex items-center p-2 w-full text-left rounded-md ${currentView === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FaUser className="mr-2" /> Profile
          </button>
        </li>
        <li className="mb-4">
          <button
            // onClick={() => setCurrentView('settings')}
            className={`flex items-center p-2 w-full text-left rounded-md ${currentView === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FaCog className="mr-2" /> Settings
          </button>
        </li>
        {currentUser && (
          <li className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md w-full text-left"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
