import React, { useState } from 'react'
import { useEffect } from 'react'
import Cards from "../components/Cards"
import axios from 'axios'
import {Link} from "react-router-dom"

function Course() {

  const [book ,setBook]=useState([])

  useEffect(()=>{
    const getBook= async()=>{
      try{
      const res=await axios.get("https://bookstore-backend-1-chms.onrender.com/book");
      console.log(res)
      setBook(res.data)
    }catch(error){
      console.log(error)
    }
  }
  getBook();
  },[]);

  return (
   <>
   <div className='w-screen md:mt-52 container mx-auto'>
    <div className='mt-28 text-center'>
      <h1 className='md:text-5xl font-semibold text-2xl text-center'> We are delighted to have you <span className='text-pink-600'>here!</span> </h1>
      <p className='text-center md:text-2xl my-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio dolore, voluptas unde, molestiae omnis incidunt at dolorem, excepturi doloremque laborum amet.</p>
   <Link to='/'>
   <button className='bg-pink-500 duration:300 mt-4 md:text-2xl text-white px-4 py-2 rounded-md hover:bg-pink-700 '> Back</button></Link>
    </div>
    <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
    {book.map((item)=>(
      <Cards key={item.id} item={item}/>
    ))}
    </div>
   
   </div>
   </>
  )
}

export default Course
   