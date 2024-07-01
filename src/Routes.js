// // src/Routes.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';import Home from './component/Home';
// import EnrolmentForm from './component/EnrolmentForm';
// import { useAuth } from './config/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { currentUser } = useAuth();
//   return currentUser ? children : <Navigate to="/login" />;
// };
// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/EnrolmentForm"   element={
//             <PrivateRoute>
//               <EnrolmentForm />
//             </PrivateRoute>
//           }  />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;


// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
// import EnrolmentForm from './component/EnrolmentForm';
import EnrolmentFormParent from './component/EnrolmentFormParent';
// import Login from './component/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/EnrolmentForm" element={<EnrolmentFormParent />} />
        <Route path="/EnrolmentForm/:id" element={<EnrolmentFormParent />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;



