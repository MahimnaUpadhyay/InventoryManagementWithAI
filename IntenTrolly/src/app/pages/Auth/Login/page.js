"use client"

// React Import
import React from 'react';

// API
import axios from 'axios';
import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL';
import { loginEndPoint } from '@/app/utility/API_END_POINT/Autho_End_Point';

// Router for navigation
import { useRouter } from 'next/navigation';

// Toast for messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React ICONS
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { MdOutlineInventory2 } from 'react-icons/md';

const page = () => {

  const router = useRouter();

  const [User, setUser] = React.useState({
    User_Email: '',
    User_Password: ''
  });

  const OnLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}${loginEndPoint}`, User);
      const { user, token } = response?.data;

      if (!user || !token) {
        toast.error("Please enter valid details");
      } else {
        toast.success("Login In Successful!");

        // Storing the token
        localStorage.setItem('token', token);

        // storing the user data
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to login page
        router.push('/pages/Home');
      }
    } catch (error) {
      console.error("There was an error during sign up:", error);
      toast.error("Login failed. Please check your email or password.");
    }
  }

  const onEmailChange = (e) => {
    setUser({ ...User, User_Email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setUser({ ...User, User_Password: e.target.value });
  };

  return (
    <>
      <div className='grid grid-cols-2 w-full h-screen place-items-center'>

        <div className='bg-blue-500 h-full w-full flex flex-col justify-center items-center text-white'>
          <div className='mb-3'>
            <MdOutlineInventory2 size={60} color="white" />
          </div>
          <h1 className='text-3xl'>Explore the World's Best <span className='font-bold'>Inventrolly</span></h1>
          <p className='w-[510px] h-auto mt-3 text-lg justify-start'>
            Manage your business with one of the best platform in industry, Introducing
            <span className='font-bold ml-1 mr-1'>
              Inventrolly.
            </span>
            One of the top leading industry product, which will make your business
            <span className='font-bold ml-1 mr-1'>
              "trolly"
            </span>
            better.
          </p>
        </div>

        <div className='flex flex-col'>
          <h1 className='text-black text-2xl font-bold'>Welcome Back!</h1>
          <hr className='border-gray-800 rounded-full mt-2' />
          <div className='w-[450px] mt-5'>
            <form className='flex flex-col justify-center items-center'>
              <input
                type='text'
                id='User_Email'
                value={User?.User_Email}
                placeholder='Enter your Email'
                onChange={onEmailChange}
                className='w-full border-2 p-2 rounded-md text-black bg-gray-100'
                required
              />
              <input
                type='password'
                id='User_Password'
                value={User?.User_Password}
                placeholder='Enter your password'
                onChange={onPasswordChange}
                className='w-full border-2 p-2 rounded-md text-black bg-gray-100 mt-5'
                required
              />
              <button
                onClick={OnLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white 
                text-lg rounded-lg mt-5 p-2">
                Sign in to your account
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default page