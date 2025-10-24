import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
const navigate=useNavigate()
const handlesignup=()=>{
  navigate('/signup')
}
const handledashboard=()=>{
  navigate('/')
}

  return (
    <div className="grid grid-cols-12  md:py-0 py-10 px-8 gap-20 md:pt-10 " >
      <div className="col-span-12 md:col-span-7">
        <h2 className="text-primary font-bold font-barlow md:leading-[100%]">
          Explore Ideas with 2,500+ Design <br />{' '}
          <span className="text-primary font-bold text-primarycolor">Expert in Real-Time</span>
        </h2>
        <p className="text-2xl md:text-xl py-4 font-barlow font-semibold">Join a community of over 2,500 expert designers to share ideas, get feedback, and collaborate in real-time—whenever inspiration strikes.</p>
        <div className="flex md:flex-row flex-col -space-x-4 items-center gap-4">
          <img
            src="/Images.png"
            alt="Design expert"
            width={300}
            height={300}
            className="rounded-full border-2 border-white object-cover"
          />
          <p className='font-semibold text-xl'>Join 2,500+ Designers & Creators Who Rely on Us for Instant Collaboration and Creative Exchange</p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 font-barlow">
        <div className="bg-gradient-to-b from-primarycolor to-secondarycolor rounded-[26px] flex flex-col px-8 py-10 gap-8 mr-10 md:mr-0 justify-start min-h-[90vh]">
          <div className=" flex flex-col gap-20 md:gap-0 py-4 w-full h-full">
            <h2 className="text-3xl font-bold text-center">Login Your Account</h2>
            <div className="py-6">
              <div className="mb-4 ">
                <label className="block text-xl text-white font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="hamzayasin499@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xl text-white font-medium mb-1" htmlFor="email">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="*********"
                  className="w-full px-4 py-3 rounded-xl bg-white focus:outline-none"
                />
              </div>
            </div>
            <button onClick={handledashboard} className='bg-white w-full py-3 px-4 cursor-pointer flex items-center text-[23px] font-barlow font-bold text-black justify-center rounded-[20px] hover:bg-black hover:text-white transition-colors'>
              Go to Dashboard
            </button>
            <p className="text-[20px] text-center font-[500] py-4">
              I don’t  Have An Account - <span onClick={handlesignup} className="cursor-pointer font-semibold text-white hover:text-black  hover:underline">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
