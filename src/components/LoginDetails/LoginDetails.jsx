import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './LoginDetails.module.css';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

export default function LoginDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const adminInfo = async () => {
    try {
      const response = await fetch('https://wish-omega-blush.vercel.app/admin/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`,

        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setUserName(data.info.userName)
        setUserEmail(data.info.email)
        console.log("snm", data);

      } else {

        toast.error(data.message, {
          theme: 'dark'
        })
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {

    }
  };

  const adminUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://wish-omega-blush.vercel.app/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`,

        },
        body: JSON.stringify({
          userName: userName,
          email: userEmail,
          password,
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload()
        },2000)
        
        toast.success(data.message, {
          theme: 'dark'
        });
      } else {

        toast.error(data.message, {
          theme: 'dark'
        })
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false)
    }
  };
  const handleupdate = (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { theme: "dark" });
      return;
    }
  
    adminUpdate();
  };

  useEffect(() => {
    adminInfo()
  }, [])
  return (
    <>

      <form className={`${styles.formsSetting} max-w-sm mr-auto mx-20 my-5 shadow-none`}>

        <div className="mb-5">
          <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Name" />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Email" />

        </div>

        <div className="mb-5 relative">
          <label htmlFor="password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <div className='relative'>
            <input type={showPassword ? "text" : "password"}
              name='password'
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Enter Your Password" />

            <button
              type="button"
              className="absolute top-[12px] right-0 left-[299px] sm:left[290px] text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

        </div>

        <div className="mb-5 relative">
          <label htmlFor="confirmPassword" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Confirm Password" />

            <button
              type="button"
              className="absolute top-[12px] right-0 left-[299px] sm:left[290px] text-gray-600"
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>


        <button
          type="submit"
          onClick={handleupdate}
          className="text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
          {isLoading ?
            <i className='fas fa-spinner fa-spin text-2xl'></i>
            : 'Save'
          }
        </button>
      </form>
    </>
  )
}
