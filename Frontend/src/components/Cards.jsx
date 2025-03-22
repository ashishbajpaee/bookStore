import React from 'react'

function Cards({item}) {
  return (
    <>
    <div className='mt-4 my-3 p-3 '>
    <div className="card bg-white  dark:bg-slate-900 dark:text-white text-black w-92 shadow-xl mx-auto hover:scale-105 duration-200">
  <figure>
    <img
      src={item.image}
      alt="Books" />
  </figure>
  <div className="card-body dark:border-2 rounded-sm">
    <h2 className="card-title text-gray-700  dark:bg-slate-900 dark:text-white">
      {item.name}
      <div className="badge badge-secondary  text-gray-700">{item.category}</div>
    </h2>
    <p className=' text-gray-700  dark:bg-slate-900 dark:text-white'>{item.title}</p>
    <div className="card-actions justify-between  text-gray-700 mt-2  dark:bg-slate-900 dark:text-white">
      <div className="badge badge-outline  dark:bg-slate-900 dark:text-white">${item.price}</div>
      <div className=" border border-[2px] cursor-pointer px-4 py-2 hover:text-white hover:bg-pink-600  rounded-md  dark:text-white dark:text">Buy Now</div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Cards
