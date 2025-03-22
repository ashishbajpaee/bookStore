import React, { useState } from "react";
import { Link,  useLocation ,useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from 'axios'
import toast from "react-hot-toast";

function Signup() {
  const location =useLocation();
  const navigate= useNavigate();
  const from= location.state?.from?.pathname || "/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password
    }
    await axios.post(`https://bookstore-backend-1-chms.onrender.com/user/signup` ,userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        toast.success("Signup Successfully");
       navigate(from, {replace :true});
      }
      localStorage.setItem("Users" ,JSON.stringify(res.data.user ));
    }).catch((err)=>{
      if(err.response){
        console.log(err);
        toast.error("Error" ,+ err.response.data.message);
      }
    })
    document.getElementById("my_modal_3").close(); // Close the dialog manually
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    document.getElementById("my_modal_3").showModal();
    setIsLoginOpen(true);
  };

  return (
    <>
      {!isLoginOpen && (
        <div className="flex h-screen items-center justify-center px-4 bg-gray-900 dark:bg-gray-900 transition-colors duration-300">
          <div
            id="signup_modal"
            className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] xl:w-[30%] bg-gray-800 dark:bg-gray-800 border-[2px] border-gray-400 dark:border-gray-700 rounded-md shadow-md p-5 transition-colors duration-300"
          >
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="text-xl btn btn-sm btn-circle btn-ghost absolute top-2 right-2 text-white dark:text-gray-600"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg text-center text-white dark:text-gray-200">
                Signup
              </h3>

              <div className="mt-4 space-y-4">
                <label className="block text-sm text-white dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md outline-none bg-gray-700 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="text-red-500 text-sm">Name is required</span>
                )}
              </div>

              <div className="mt-4 space-y-4">
                <label className="block text-sm text-white dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md outline-none bg-gray-700 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">Email is required</span>
                )}
              </div>

              <div className="mt-4 space-y-4">
                <label className="block text-sm text-white dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md outline-none bg-gray-700 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
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
                  className="w-full sm:w-auto bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-700 duration-200"
                >
                  Signup
                </button>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Have an account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      <Login />
    </>
  );
}

export default Signup;
