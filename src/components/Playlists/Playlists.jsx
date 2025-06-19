import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Playlists.module.css';
import { Pagination } from "flowbite-react";
import { toast } from 'react-toastify';
export default function Playlists() {
  const [isShowDeactivatePopUp, setShowDeactivatePopUp] = useState(false);
  const [isShowActivatePopup, setIsShowActivatePopup] = useState(false);
  const [isShowRenewPopup, setIsShowRenewPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allDevice, setAllDevice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setAllPage] = useState(0);
  const [isCost, setIsCost] = useState();
  const [isUserId, setIsUserId] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [searchDevice, setSearchDevice] = useState('');

  const toggleDropdownFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedFilters(prevFilters =>
      checked ? [...prevFilters, id] : prevFilters.filter(filter => filter !== id)
    );
  };

  function openPopup(data) {
    setIsUserId(data._id)
    if (data.isSubscribed) {
      setShowDeactivatePopUp(true)
    } else {
      setIsShowActivatePopup(true)
    }
  }
  function renewPopUp(id) {
    setIsUserId(id)
    setIsShowRenewPopup(true)
  };
  const filteredDevice = allDevice.filter((item) =>
    selectedFilters.length === 0 || selectedFilters.includes(item.type?.toLowerCase())
  );
  /////////////////////// START GET DEVICE FUNCTION////////////////
  const getDevice = async (page) => {

    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/user/get?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAllDevice(data.users);
        setCurrentPage(data.page);
        setAllPage(data.totalPages)

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
  const onPageChange = (page) => {
    setCurrentPage(page)
    getDevice(page)
  };

  useEffect(() => {
    getDevice(1)
  }, [])
  ///////////////////////END GET DEVICE FUNCTION////////////////////////

  ///////////////////////START NEW SUBSCRIPTION FUNCTION/////////////////
  const newSubscription = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/dashboard/subscription/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ subscriptionType: 'yearly', cost: isCost })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: "dark"
        });
        setIsCost('')
        getDevice(currentPage)
        setIsShowActivatePopup(false)
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
  function handleActive() {
    if (isCost == '') {
      toast.error('Please Enter the Pay Amount First', {
        theme: 'dark'
      })
    } else {
      newSubscription(isUserId);
    }
  }

  /////////////////////// END NEW SUBSCRIPTION FUNCTION/////////////////////

  /////////////////////// START CANCEL SUBSCRIPTION FUNCTION////////////////

  const cancelSubscription = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/dashboard/stopSubscription/${id}`, {
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
        getDevice(currentPage)
        setShowDeactivatePopUp(false)
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

  function handleCancel() {
    cancelSubscription(isUserId)
  }
  /////////////////////// END CANCEL SUBSCRIPTION FUNCTION////////////////

  /////////////////////// START RENEW SUBSCRIPTION FUNCTION////////////////
  const renewSubscription = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/dashboard/renewSubscription/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ subscriptionType: 'yearly', cost: isCost })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: "dark"
        });
        setIsCost('')
        getDevice(currentPage)
        setIsShowRenewPopup(false)
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
          case 400:
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
  function handleRenew() {
    if (isCost == '') {
      toast.error('Please Enter the Pay Amount First', {
        theme: 'dark'
      })
    } else {
      renewSubscription(isUserId);
    }
  }

  /////////////////////// END RENEW SUBSCRIPTION FUNCTION///////////////////

  ///////////////////////////START SEARCH DEVICE CUSTOMER////////////////////////////////////
  const getSearch = async (macAddress) => {
    setSearchDevice(macAddress);

    if (macAddress === '') {
      getDevice(currentPage); // Fetch all transactions if search is cleared
      return;
    }

    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/user/search?macAddress=${macAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Apply device filter to the search results
        const filteredResults = data.users.filter(item =>
          selectedFilters.length === 0 || selectedFilters.includes(item.type?.toLowerCase())
        );
        setAllDevice(filteredResults);
      }

    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////END SEARCH DEVICE CUSTOMER////////////////////////////////////
  return (
    <>
      <div className={`${styles.dashboard_options} mt-12 flex items-center justify-around`}>
        <h1 className='font-semibold text-[20px]'>Customers</h1>



        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className={`${styles.searchInput} relative w-[50%]`}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>

          </div>
          <input onChange={(e) => getSearch(e.target.value)} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        </div>
        {/* <button type="button" onClick={() => setIsNewCustomer(true)} 
        className={`${styles.btn_filter} text-white  border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-black`}>
          Filter<i class="fa-solid fa-caret-down ml-2"></i></button> */}
        <div className={`${styles.filter} relative flex`}>
          {/* Button */}
          <button
            type="button"
            onClick={toggleDropdownFilter}
            className={`${styles.btn_filter} text-white border bg-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center`}
          >
            Filter
            <i className="fa-solid fa-caret-down ml-2"></i>
          </button>

          {isOpenFilter && (
            <div className=
              {`${styles.filter_dropdown} absolute mt-2 border-2 border-solid border-black p-3 bg-white rounded-lg shadow dark:bg-gray-700`}>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id='lg'
                    onChange={handleFilterChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor='lg'
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lg
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id='samsung'
                    onChange={handleFilterChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor='samsung'
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Samsung
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    id='android'
                    onChange={handleFilterChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor='android'
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Android
                  </label>
                </li>

              </ul>
            </div>
          )}
        </div>


      </div>
      <div className={`${styles.playlists_table}`}>
        <table className='table-auto w-full'>
          <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
            <tr>
              <th scope="col" className=" py-3">Mac address</th>
              <th scope="col" className=" py-3">Device type</th>
              <th scope="col" className=" py-3">Expiry date</th>
              <th scope="col" className={`${styles.url_title}  py-3`}>URL</th>
              <th scope="col" className=" py-3">Actions</th>
              <th scope="col" className=" py-3">Renew</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevice.length > 0 ? (
              filteredDevice.map((item, index) => (
                <tr>
                  <td scope="col" className=" py-4">{item.macAddress}</td>

                  <td scope="col" className=" py-3">{item.type}</td>

                  <td scope="col" className=" py-3">{item.isSubscribed ? item.endDate : '-'}</td>
                  <td scope="col" className={` py-3 text-[#696CD6] ${styles.url_colmun}`}>
                    {item.playlists?.length == 0 ? '-' : item.playlists[0]?.url}</td>

                  <td scope="col" className=" py-3">
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={() => openPopup(item)}
                        checked={item.isSubscribed}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-400 dark:peer-checked:bg-red-400"></div>
                    </label>
                  </td>
                  <td scope="col" className=" py-3" >
                    <i onClick={() => renewPopUp(item._id)} className={`${styles.renew_btn} fa-solid fa-circle-plus text-2xl cursor-pointer`}></i>
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

        {isShowDeactivatePopUp ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button onClick={() => setShowDeactivatePopUp(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <h2 className='text-black font-bold mb-3'>Confirm Deactivation</h2>
                  <h3 className="mb-5 text-lg font-normal text-black">Are you sure to Stop Subscription this playlist?</h3>
                  <div className='flex justify-center items-center'>
                    <button type="button" onClick={handleCancel}
                      className="text-blue-700 mx-4 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Confirm'
                      }</button>
                    <button data-modal-hide="popup-modal" onClick={() => setShowDeactivatePopUp(false)} type="button"
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
        {isShowActivatePopup ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button onClick={() => setIsShowActivatePopup(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <div className="col-span-2 mb-4">
                    <label htmlFor="cost" className="flex mb-2  font-medium text-gray-900 dark:text-white">Pay Amount</label>
                    <input type="number" onChange={(e) => setIsCost(e.target.value)} value={isCost} name="cost" id="cost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pay Amount" required="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <button type="button" onClick={handleActive}
                      className="text-blue-700 mx-4 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Confirm'
                      }
                    </button>
                    <button data-modal-hide="popup-modal" onClick={() => setIsShowActivatePopup(false)} type="button"
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

        {isShowRenewPopup ?
          <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button onClick={() => setIsShowRenewPopup(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <div className="col-span-2 mb-4">
                    <label htmlFor="cost" className="flex mb-2  font-medium text-gray-900 dark:text-white">Pay Amount</label>
                    <input type="number" onChange={(e) => setIsCost(e.target.value)} value={isCost} name="cost" id="cost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Pay Amount" required="" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <button type="button" onClick={handleRenew}
                      className="text-blue-700 mx-4 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                      {isLoading ?
                        <i className='fas fa-spinner fa-spin text-2xl'></i>
                        : 'Confirm'
                      }
                    </button>
                    <button data-modal-hide="popup-modal" onClick={() => setIsShowRenewPopup(false)} type="button"
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
      </div>

      <div className={`${styles.pagination} flex items-center justify-between `}>
        <h3>Showing {currentPage} to {totalPages} of {totalPages} entries</h3>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>

      </div>
    </>
  )
}
