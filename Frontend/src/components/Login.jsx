import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import toast  from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const userInfo={
      email:data.email,
      password:data.password
    }
    await axios.post(`https://bookstore-backend-1-chms.onrender.com/user/login` ,userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
       toast.success("LoggedIn Successfully");
       document.getElementById("my_modal_3").close();
       setTimeout(()=>{
       
        window.location.reload(); 
        localStorage.setItem("Users" ,JSON.stringify(res.data.user ));
       },3000)
     
      }
      
    }).catch((err)=>{
      if(err.response){
        console.log(err);
        toast.error("Error" ,+ err.response.data.message);
        setTimeout(()=>{},3000)
             }
    })
   // Close the dialog manually
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-gray-700 dark:bg-gray-800 border-[2px] border-gray-400 dark:border-gray-700 rounded-md shadow-md p-5 transition-colors duration-300">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link
            to="/"
            type="button"
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-200 dark:text-gray-300"
          >
            ✕
          </Link>
          <h3 className="font-bold text-lg text-center text-black dark:text-gray-200">
            Login
          </h3>
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-black dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          <div className="mt-4 space-y-4">
            <label className="block text-sm text-black dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password is required
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 items-center space-y-4 sm:space-y-0">
            <button
              type="submit"
              className="w-full sm:w-auto bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-700 duration-200"
            >
              Login
            </button>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-500 cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
