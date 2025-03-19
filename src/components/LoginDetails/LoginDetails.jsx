import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './LoginDetails.module.css';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

export default function LoginDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const initialValues = {
    // name: "",
    // email: "",
    password: "",
    confirmPassword: ""
  }
  const validationSchema = Yup.object().shape({
    // name: Yup.string().min(3, "Not less than 3").max(10, "Max is 10").required("Name is Required"),
    // email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{5,10}$/,
        "Password must be 5-10 characters and contain letters or numbers")
      .required("Password is Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "RePassword should match Password").required("RePasswprd is Required"),
  })



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
        // formik.values.name = data.info.userName
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
          password: formik.values.password,
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        window.location.reload()
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: adminUpdate
  })

  useEffect(() => {
    adminInfo()
  }, [])
  return (
    <>

      <form className={`${styles.formsSetting} max-w-sm mr-auto mx-20 my-5 shadow-none`} onSubmit={formik.handleSubmit}>

        <div className="mb-5">
          <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
            // onBlur={formik.handleBlur}
            value={userName}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Name" />

          {formik.errors.name && formik.touched.name && (
            <span className='text-red-600'>{formik.errors.name}</span>
          )}

        </div>

        <div className="mb-5">
          <label htmlFor="email" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Email" />

          {formik.errors.email && formik.touched.email && (
            <span className='text-red-600'>{formik.errors.email}</span>
          )}

        </div>

        <div className="mb-5 relative">
          <label htmlFor="password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <div className='relative'>
            <input type={showPassword ? "text" : "password"}
              name='password'
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
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
          {formik.errors.password && formik.touched.password && (
            <span className='text-red-600'>{formik.errors.password}</span>
          )}
        </div>

        <div className="mb-5 relative">
          <label htmlFor="confirmPassword" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Confirm Password" />

            <button
              type="button"
              className="absolute top-[12px] right-0 left-[299px] sm:left[290px] text-gray-600"
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className='text-red-600'>{formik.errors.confirmPassword}</span>
          )}
        </div>


        <button disabled={!(formik.isValid && formik.dirty)}
          type="submit"
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
