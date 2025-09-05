"use client";

// React Import
import React from 'react';

// API Import
import axios from 'axios';
import { BASE_URL } from '@/app/utility/API_END_POINT/Base_URL';
import { signinEndPoint } from '@/app/utility/API_END_POINT/Autho_End_Point';

// Router for navigation
import { useRouter } from 'next/navigation';

// Toast Import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icon Import
import { MdOutlineInventory2 } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';

const page = () => {
    const router = useRouter();

    const [User, setUser] = React.useState({
        User_Name: '',
        User_Email: '',
        User_Password: ''
    });

    const OnSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}${signinEndPoint}`, User);
            const UserData = response?.data?.user;

            if (!UserData) {
                toast.error("Please enter valid details");
            } else {
                toast.success("Sign Up Successful!");

                // Redirect to login page
                router.push('/pages/Auth/Login');
            }
        } catch (error) {
            console.error("There was an error during sign up:", error);
            toast.error("Sign up failed. Please check your email.");
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 w-full h-screen place-items-center">
                <div className="flex flex-col">
                    <h1 className="text-black text-2xl font-bold">Hey There!</h1>
                    <hr className="border-gray-800 rounded-full mt-2" />
                    <div className="w-[450px] mt-5">
                        <form className="flex flex-col justify-center items-center" onSubmit={OnSignUp}>
                            <input
                                type="text"
                                value={User.User_Name}
                                placeholder="Your good name"
                                onChange={(e) => setUser({ ...User, User_Name: e.target.value })}
                                className="w-full border-2 p-2 rounded-md text-black bg-gray-100"
                                required
                            />
                            <input
                                type="email"
                                value={User.User_Email}
                                placeholder="Enter your Email"
                                onChange={(e) => setUser({ ...User, User_Email: e.target.value })}
                                className="w-full border-2 p-2 rounded-md text-black bg-gray-100 mt-5"
                                required
                            />
                            <input
                                type="password"
                                value={User.User_Password}
                                placeholder="Enter your password"
                                onChange={(e) => setUser({ ...User, User_Password: e.target.value })}
                                className="w-full border-2 p-2 rounded-md text-black bg-gray-100 mt-5"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-lg mt-5 p-2"
                            >
                                Create Account
                            </button>
                            <ToastContainer />
                        </form>

                        <h1 className='flex w-full justify-center mt-5 font-bold'>Already have account</h1>

                        <div className='flex w-full justify-center'>
                            <button
                                onClick={()=>router.push("/pages/Auth/Login")}
                                className="flex justify-center gap-3 items-center w-[215px] bg-gray-200 hover:bg-gray-300
                                 text-black text-lg rounded-lg mt-5 p-2">
                                Login

                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-500 h-full w-full flex flex-col justify-center items-center text-white">
                    <div className="mb-3">
                        <MdOutlineInventory2 size={60} color="white" />
                    </div>
                    <h1 className="text-3xl">
                        Explore the World's Best <span className="font-bold">Inventrolly</span>
                    </h1>
                    <p className="w-[510px] mt-3 text-lg text-start">
                        Manage your business with one of the best platforms in the industry, introducing{" "}
                        <span className="font-bold">Inventrolly</span>.
                        One of the top leading industry products, designed to make your business
                        <span className="font-bold"> better & smarter</span>.
                    </p>
                </div>
            </div>
        </>
    );
};

export default page;
