import React from 'react'
import { useState ,useEffect } from 'react';
// import list from "../../public/list.json"
// import list from "../assets/list.json"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';


function Freebook() {

  const [book ,setBook]=useState([])

  useEffect(()=>{
    const getBook= async()=>{
      try{
      const res=await axios.get(`https://bookstore-backend-1-chms.onrender.com/book`);
      console.log(res)
      const data=res.data.filter((data)=>data.category==="Free");
      setBook(data);
    }catch(error){
      console.log(error)
    }
  }
  getBook();
  },[]);

    // const filterData=list.filter((data)=>data.category==="Free");
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <>
      <div className='w-screen container mx-auto  md:flex-row md:mt-35 my-10'>
      <div> <p className='font-semibold text-3xl pb-2  text-white '> Free Books</p>
         <p className='text-xl text-white'>Some Books are heart and soul of the society and prices on them are wrong with the society. </p>
    </div>
     
      <div className="w-screen container mx-auto  md:flex-row md:mt-35 my-10">
      <Slider {...settings}>
        {book.map((item)=>(
            <Cards item={item} key={item.id}/>
        ))}
      </Slider>
    </div>
    </div>
    </>
  )
}

export default Freebook
