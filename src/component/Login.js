import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, GoogleProvider } from '../config/firebaseConfig'; // Adjust the path based on your setup
// import { useNavigate } from "react-router-dom"

const Login = ({closeModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // const navigate =  useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    let passwordError = '';
    let emailError = '';
    let confirmPasswordError = '';
    let displayNameError = '';

    if (name === 'email') {
      setEmail(value);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (attemptedSubmit) {
        if (!value) {
          emailError = 'Email is required';
        } else if (!emailRegex.test(value)) {
          emailError = 'Email is invalid';
        }
      }
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    } else if (name === 'password') {
      setPassword(value);
      const isValidLength = value.length >= 8;
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (attemptedSubmit) {
        if (!value) {
          passwordError = 'Password is required';
        } else if (!isValidLength || !hasSpecialChar) {
          passwordError = 'Password must have at least 8 characters and contain at least one special character';
        }
      }
      setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      if (attemptedSubmit && isSignup) {
        if (!value) {
          confirmPasswordError = 'Confirm Password is required';
        } else if (password !== value) {
          confirmPasswordError = 'Passwords do not match';
        }
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
      }
    } else if (name === 'displayName') {
      setDisplayName(value);
      if (attemptedSubmit && isSignup) {
        if (!value) {
          displayNameError = 'Display Name is required';
        }
        setErrors((prevErrors) => ({ ...prevErrors, displayName: displayNameError }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    const isValidLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!isValidLength || !hasSpecialChar) {
      errors.password = 'Password must have at least 8 characters and contain at least one special character';
    }

    if (isSignup) {
      if (!displayName) {
        errors.displayName = 'Display Name is required';
      }
      if (!confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    return errors;
  };

  // console.log("user",auth?.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      
      try {
        if (isSignup) {
          // Attempt to create a new user
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // Update profile if sign-up successful
          await updateProfile(userCredential.user, {
            displayName,
          });
  
          // console.log('User created with displayName:', displayName);
          toggleForm();
          closeModal();
        } else {
          // Attempt to sign in with existing credentials
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in:', userCredential.user);
          closeModal();
        }
      } catch (error) {
        console.error('Error creating or signing in user:', error.message);
        // Handle specific errors here, such as auth/email-already-in-use
        if (error.code === 'auth/email-already-in-use') {
          // Provide feedback to the user that the email is already in use
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'Email is already in use. Please sign in instead.',
          }));
        } else {
          // Handle other errors accordingly
          setErrors(prevErrors => ({
            ...prevErrors,
            general: 'An error occurred. Please try again later.',
          }));
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const handleGoogleSignIn = async () => {
    // const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, GoogleProvider );
      console.log('Google sign-in result:', result);
      closeModal()
      // Handle successful sign-in, maybe redirect or update UI
    } catch (error) {
      // console.error('Error with Google sign-in:', error.message);
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setErrors({});
    setAttemptedSubmit(false);
  };

  return (
    <div >
      {loading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto mt-10 py-6 px-16 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="mb-4">
                <label htmlFor="displayName" className="block text-gray-700">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  className={`w-full px-4 py-2 border rounded-md ${errors.displayName ? 'border-red-500' : 'border-gray-300'}`}
                  value={displayName}
                  onChange={handleChange}
                />
                {errors.displayName && <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={password}
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? '🔓' : '🔒'}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {isSignup && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? '🔓' : '🔒'}
                  </span>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 mt-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 flex justify-center items-center"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" className="w-6 h-6 mr-2" />
            <span >Sign Up with Google</span>
          </button>
          <div className="text-center mt-4">
            <button
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
