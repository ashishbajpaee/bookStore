import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Freebook from '../components/Freebook'
import Chatbot from '../components/Chatbot'
function Home() {
  return (
    <>
    <div className="bg-slate-900 dark:bg-slate-900 min-h-1">
  <Navbar />
</div>

    <Banner/>
    <Chatbot/>
    <Freebook/>
    <Footer/>

    </>
  )
}

export default Home
