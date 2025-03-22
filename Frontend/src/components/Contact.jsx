import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Contact() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="contact-container w-full md:w-1/2 px-4 sm:px-8 mx-auto overflow-y-hidden min-h-screen justify-center text-base sm:text-lg md:text-2xlbg-gray-900 rounded-md py-6text-white mt-12 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-2xl md:text-3xl text-white my-10 text-center">
          Contact Us
        </h3>
        <div className="mt-4 space-y-4">
          <span className="block text-sm md:text-lg text-white">Name</span>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full bg-slate-700  px-3 py-2 sm:py-3 border rounded-md outline-none text-sm md:text-base"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>
        <div className="mt-4 space-y-4">
          <span className="block text-sm md:text-lg text-white">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-slate-700 px-3  py-2 sm:py-3 border rounded-md outline-none text-sm md:text-base"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>
        <div className="mt-4 space-y-4">
          <span className="block text-sm md:text-lg text-white">Message</span>
          <textarea
            placeholder="Type your message"
            className="w-full bg-slate-700 text-white px-3 py-2 sm:py-3 border rounded-md outline-none text-sm md:text-base"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">Message is required</span>
          )}
        </div>
        <div className="gap-2 space-x-2 mt-8">
          <p className="gap-2 text-white">
            Fill this form for any query and suggestion:
            <a
              href="https://docs.google.com/forms/d/1hdqv-ptRHX1xjSmKJ7GCgKF4hQ-JCcGTUGfLW3ajrHs/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-md hover:bg-blue-700 transition duration-200 text-sm md:text-base"
              >
                Form
              </button>
            </a>
          </p>
        </div>
        <div className="space-x-4 flex justify-start mt-20">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm md:text-base"
          >
            Submit
          </button>
          <Link to="/">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-200 text-sm md:text-base">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Contact;
