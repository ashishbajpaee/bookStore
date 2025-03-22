import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Course from '../components/Course'

function Courses() {
  return (
    <>
     <div className="bg-slate-900 dark:bg-slate-900 min-h-1">
      <Navbar/>
      </div>
      <Course/>
     
      
      <Footer/>
    </>
  )
}

export default Courses
