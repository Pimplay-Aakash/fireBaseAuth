// src/Home.js
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import HomeContent from './HomeContent';
import ReportsContent from './ReportsContent';
import Login from './Login';
import { collection, getDocs,query,where, orderBy, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../config/AuthContext';


const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // Track the current view
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  // console.log('currentView',currentView);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'formSubmissions'));
  //       const fetchedData = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setData(fetchedData);
  //       setLoading(false);
  //     } catch (error) {
  //       // console.error("Error fetching data: ", error);
  //       alert(`error fetching the data`)
  //       setLoading(false); // Ensure loading state is set to false on error
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array to fetch data once on component mount

  // Get the current user from AuthContext
  const { currentUser } = useAuth(); // Ensure this provides userId


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!currentUser) {
  //       alert('User not logged in');
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const q = query(
  //         collection(db, 'formSubmissions'),
  //         where('userId', '==', currentUser.uid) // Filter by userId
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const fetchedData = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setData(fetchedData);
  //     } catch (error) {
  //       alert('Error fetching data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); 

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        alert('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'formSubmissions'),
          where('userId', '==', currentUser.uid), // Filter by userId
          orderBy('timestamp', 'desc') // Order by timestamp descending
        );
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fetchedData);
      } catch (error) {
        alert('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]); 


  const handleDelete = async (dataId) => {
    try {
      await deleteDoc(doc(db, 'formSubmissions', dataId));
      // Remove the deleted entry from the state
      setData(prevData => prevData.filter(item => item.id !== dataId));
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Failed to delete the document');
    }
  };
  // console.log("data for the home", data);

  // Assuming data[0].categoryCounts is an object with keys like 'new', 'demo', 'bio', etc.
  // const categoryCountsToArray = (categoryCountsObject) => {
  //   return Object.entries(categoryCountsObject).map(([key, value]) => ({ key, value }));
  // };
  
  // Example usage:
  // const arraydata = []
  // const makeArray = (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     // console.log('id of the data ', data[i].id);
  //     const dataId = data[i].id
  //     const categoryCounts = data.length > 0 ? data[i].categoryCounts : {};
  //     arraydata.push(categoryCounts)
  //   }

  // }

  const arraydata = [];

const makeArray = (data) => {
  for (let i = 0; i < data.length; i++) {
    const dataId = data[i].id;
    const categoryCounts = data.length > 0 ? data[i].categoryCounts : {};

    // Clone and add dataId to categoryCounts
    const updatedCategoryCounts = {
      ...categoryCounts,
      dataId: dataId,
    };

    // Push the updated object to array
    arraydata.push(updatedCategoryCounts);
  }
  // console.log('updatedCategoryCounts', arraydata);
};

 makeArray(data)

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <NavBar openLoginModal={openLoginModal} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar setCurrentView={setCurrentView} currentView={currentView}/> {/* Pass setCurrentView to Sidebar */}
        <div className="flex-grow">
          {currentView === 'home' && <HomeContent data={arraydata} loading={loading} />}
          {currentView === 'reports' && <ReportsContent data={arraydata} loading={loading} onDelete={handleDelete} />}
          {/* Add more components as needed */}
        </div>
      </div>
      {showLoginModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <Login closeModal={closeLoginModal} />
        </div>
      )}
    </div>
  );
};

export default Home;
