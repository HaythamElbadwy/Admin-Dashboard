import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Reseller.module.css';
import { Pagination, theme } from 'flowbite-react';
import { toast } from 'react-toastify';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';

export default function Reseller() {
  const [isNewReseller, setIsNewReseller] = useState(false);
  const [isediteReseller, setIsEditeReseller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBlockPopUp, setShowBlockPopUp] = useState(false);
  const [isName, setIsName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [customerLimit, setCustomerLimit] = useState();
  const [isAllReseller, setIsAllReseller] = useState([]);
  const [resellerId, setResellerId] = useState();
  const [isUserId, setIsUserId] = useState();
  const [blockword, setBlockWord] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const initialValues = {
    password: ""
  }
  function addReseller() {
    setIsNewReseller(true)
  }
  function openBlockPopup(data) {
    setIsUserId(data._id)
    setShowBlockPopUp(true)

    if (data.block) {
      setBlockWord('Are you sure you want to unblock the account reseller?')
    } else {
      setBlockWord('Are you sure you want to block the account reseller?')
    }
  }

  /////////////////////// START GET RESELLER FUNCTION////////////////
  const getReseller = async (page) => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/reseller/get?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();


      if (response.ok) {

        toast.success(data.message, {
          theme: "dark"
        });
        setIsAllReseller(data.allResellers);
        console.log(data);


      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };



  useEffect(() => {
    getReseller()
  }, [])




  /////////////////////// END GET RESELLER FUNCTION////////////////

  ////////////////////////START ADD RESELLER//////////////////////////////
  const addNewReseller = async () => {
    console.log(email, isName, password, customerLimit);

    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/admin/createReseller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          email, password: formik.values.password
          , userName: isName, subscriptionsNum: customerLimit
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        getReseller()
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsNewReseller(false)
        clearInput()
        formik.resetForm();
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.', {
              theme: "dark"
            });
        }
      }

    } catch (err) {
      console.error("Error Saving Faqs:", err);
    } finally {
      setIsLoading(false)
    }
  };

  function handleAdd() {
    if (isName == '' || email == '' || password == '' || customerLimit == '') {
      toast("All faildes is Rquired!", {
        theme: "dark"
      })
    } else {
      addNewReseller()
    }

  }

  function clearInput() {
    setIsName('')
    setEmail('')
    setCustomerLimit('')

  }
  ////////////////////////END ADD RESELLER/////////////////////////////////////

  //////////////////////START EDITE RESELLER///////////////////////////////////

  const editeReseller = async (id) => {
    console.log(password);
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/reseller/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ email, password, userName: isName, subscriptionsNum: customerLimit })
      });

      const data = await response.json();

      if (response.ok) {
        getReseller()
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsEditeReseller(false)
        clearInput()
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Faqs:", err);
    } finally {
      setIsLoading(false)
    }
  };


  function hundleUpdate() {
    if (isName == '' || email == '' || customerLimit == '') {

      toast("All faildes is Rquired!")
    } else {
      editeReseller(resellerId)

    }

  }

  ////////////////////END EDITE RESELLER/////////////////////////////////

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{5,10}$/,
        "The password must be 5 to 10 characters long and contain letters, numbers, or both.")
      .required("Password is Required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addNewReseller
  })

  ////////////////////START BLOCK RESELLER FUNCTION//////////////////////


  const blockReseller = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/admin/blockReseller/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: "dark"
        });
        getReseller()
        setShowBlockPopUp(false)
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };
  function handleBlock() {
    blockReseller(isUserId)
  }

  ////////////////////END BLOCK RESELLER FUNCTION//////////////////////

  function handleEditeReseller(data) {
    setIsEditeReseller(true);
    setEmail(data.email)
    setIsName(data.userName)
    setCustomerLimit(data.subscriptionsNum)
    setResellerId(data._id)
  }

  const filteredReseller = isAllReseller.filter((item) =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <section className={`${styles.reseller_dashboard} pb-10 pl-20 px-9 mt-28`}>
        <div className={`${styles.reseller_options} mt-12 flex items-center justify-around`}>
          <h1 className={`${styles.reseller_title} font-semibold text-[20px]`}>Reseller</h1>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className={`${styles.searchInput} relative w-[50%]`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="button" onClick={addReseller}
            className="text-blue-700 hover:text-white border
           border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
             dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            <i className="fa-solid fa-plus mr-4"></i>
            New Reseller</button>
        </div>

        <div className={`${styles.reseller_table}`}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>

              <tr>
                <th scope="col" className="py-3">Name</th>
                <th scope="col" className="py-3">Email</th>
                <th scope="col" className="py-3">Subscribe num</th>
                <th scope="col" className="py-3">Created date</th>
                <th scope="col" className="py-3">Actions</th>
              </tr>

            </thead>
            <tbody>
              {filteredReseller.length > 0 ? (
                filteredReseller.map((item, index) => (

                  <tr key={index}>

                    <td scope="col" className="py-4">{item.userName}</td>
                    <td scope="col" className="py-3">{item.email}</td>
                    <td scope="col" className="py-3">{item.subscriptionsNum}</td>
                    <td scope="col" className="py-3">{item.currentDate}</td>
                    <td scope="col" className="py-3 flex justify-center items-center">
                      <i className={`${styles.icon_edite} fa-solid fa-pen mx-4 cursor-pointer`} onClick={() => handleEditeReseller(item)}></i>
                      <Link to={`resellerCustomer/${item._id}`}><i className={`${styles.icon_eye} fa-solid fa-eye`}></i></Link>
                      <label className="inline-flex items-center cursor-pointer mx-4">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          onChange={() => openBlockPopup(item)}
                          checked={item.block}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400 dark:peer-checked:bg-red-400"></div>
                      </label>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2 text-gray-500">
                    No matching results found
                  </td>
                </tr>
              )}


            </tbody>
          </table>
        </div>



        {isNewReseller ?
          <form onSubmit={formik.handleSubmit}>
            <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      ADD Reseller
                    </h3>
                    <button type="button" onClick={() => setIsNewReseller(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label htmlFor="name" className="flex mb-2  font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" onChange={(e) => setIsName(e.target.value)} value={isName} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Name" required="" />
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="email" className="flex mb-2  font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email" required="" />
                      </div>

                      <div className="col-span-2">
                        <label htmlFor="password"
                          className="flex mb-2  font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Password" required="" />
                      </div>
                      {formik.errors.password && formik.touched.password && (
                        <span className='text-red-600'>{formik.errors.password}</span>
                      )}
                      <div className="col-span-2">
                        <label htmlFor="customerlimit" className="flex mb-2  font-medium text-gray-900 dark:text-white">Customer Limit</label>
                        <input type="number" onChange={(e) => setCustomerLimit(e.target.value)} value={customerLimit} name="customerlimit" id="customerlimit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Subscribe Num" required="" />
                      </div>
                    </div>
                    <button type="button" className="text-blue-700 mr-5
                   hover:text-white border border-blue-700
                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                      dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
                       dark:hover:bg-blue-500 dark:focus:ring-blue-800">Reset</button>

                    <button type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                      onClick={handleAdd}
                      className="text-white mr-5 inline-flex items-center bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Add'}
                    </button>
                    <button type="submit" onClick={() => setIsNewReseller(false)}
                      className="text-white mr-5 inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">
                      Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          : ''}

        {isShowBlockPopUp ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button onClick={() => setShowBlockPopUp(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <h2 className='text-black font-bold mb-3'>Confirm Block Reseller</h2>
                  <h3 className="mb-6 text-lg font-normal text-black">
                    {blockword}</h3>
                  <div className='flex justify-center items-center'>
                    <button type="button"
                      onClick={handleBlock}
                      className="text-blue-700 mx-4 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Confirm'
                      }</button>
                    <button data-modal-hide="popup-modal" onClick={() => setShowBlockPopUp(false)} type="button"
                      className="text-white mx-4 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : ''
        }

        {isediteReseller ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edite Reseller
                  </h3>
                  <button type="button" onClick={() => setIsEditeReseller(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="name" className="flex mb-2  font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" onChange={(e) => setIsName(e.target.value)} value={isName} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Name" required="" />
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="email" className="flex mb-2  font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email" required="" />
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="password" className="flex mb-2  font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Password" required="" />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="customerlimit" className="flex mb-2  font-medium text-gray-900 dark:text-white">Customer Limit</label>
                      <input type="number" onChange={(e) => setCustomerLimit(e.target.value)} value={customerLimit} name="customerlimit" id="customerlimit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Subscribe Num" required="" />
                    </div>
                  </div>
                  <button type="button" className="text-blue-700 mr-5
                   hover:text-white border border-blue-700
                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                      dark:border-blue-500 dark:text-blue-500 dark:hover:text-white
                       dark:hover:bg-blue-500 dark:focus:ring-blue-800">Reset</button>

                  <button type="submit"
                    onClick={hundleUpdate}
                    className="text-white mr-5 inline-flex items-center bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Edite'}
                  </button>

                  <button type="submit" onClick={() => setIsEditeReseller(false)}
                    className="text-white mr-5 inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700">
                    Cancel</button>
                </div>
              </div>
            </div>
          </div>
          : ''}

      </section>
    </>
  )
}
