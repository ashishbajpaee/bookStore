import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './home/Home';
import Signup from './components/Signup';
import Courses from './courses/Courses';
import Contact from './components/Contact';
import { userAuth } from './context/AuthProvider';
import Loader from './components/Loader';

function App() {
  const [authUser, setAuthUser] = userAuth();
  const [loadingComplete, setLoadingComplete] = useState(false);


  useEffect(() => {
    if (!sessionStorage.getItem('loaderShown')) {
      sessionStorage.setItem('loaderShown', 'true');
      setLoadingComplete(false);
    } else {
      setLoadingComplete(true);
    }
  }, []);

  if (!loadingComplete) {
    return <Loader setLoadingComplete={setLoadingComplete} />;
  }

  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/course' 
            element={authUser ? <Courses /> : <Navigate to='/signup' />} 
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
