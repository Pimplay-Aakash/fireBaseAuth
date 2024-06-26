import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import MyTable from './table';

const MainContent = ({data, loading}) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'formSubmissions'));
//         const fetchedData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setData(fetchedData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setLoading(false); // Ensure loading state is set to false on error
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to fetch data once on component mount

//   if (loading) {
//     return <p>Loading data...</p>;
//   }

//   // Assuming data[0].categoryCounts is an object with keys like 'new', 'demo', 'bio', etc.
//   // const categoryCountsToArray = (categoryCountsObject) => {
//   //   return Object.entries(categoryCountsObject).map(([key, value]) => ({ key, value }));
//   // };
  
//   // Example usage:
//   const arraydata = []
//   const makeArray = (data) => {
//     for (let i = 0; i < data.length; i++) {
  
//       const categoryCounts = data.length > 0 ? data[i].categoryCounts : {};
//       arraydata.push(categoryCounts)
//     }

//   }

//   const transformData = makeArray(data)
  // const categoryCountsArray = categoryCountsToArray(categoryCounts);
//   console.log('transformData', transformData);
//   console.log('arraydata', arraydata);
//   console.log('data', data);
  

  const columns = [
    {label:'S.No',
       key:'s.no',
       render: (name,index) => (
        <span>{index + 1}</span>
       )
    },
    { label: "Date", key: "date" },
    { label: "New", key: "new" },
    { label: "Demo", key: "demo" },
    { label: "Bio", key: "bio" },
    { label: "M100", key: "m100" },
    { label: "M000", key: "m000" },
    { label: "Others", key: "others" },
    { label: "Deposite", key: "totalDeposite" },
    { label: "Ibrahim", 
      key: "ibrahim",
      render: (name,index,row) => (
        <span onClick={() => console.log(row.topaid)}>{name}&emsp;{(row.topaid === 0) ? 'paid' : 'Not paid'}</span>
      )
    },
    { label: "Total Earnings", key: "earnings" },
  ];

  if (loading) {
        return <p>Loading data...</p>;
    }

  return (
    <main className="flex-grow p-4  overflow-auto">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      {/* <p>Welcome to your dashboard! Here you can find a quick overview of your activities and data.</p> */}

      <MyTable
        data={data} // Pass categoryCounts directly
        columns={columns}
        perPageLimit={10} // Example limits, adjust as needed
        pageBtnLimit={5}
      />
    </main>
  );
};

export default MainContent;
