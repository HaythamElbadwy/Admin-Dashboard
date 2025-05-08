import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './ResellerCustomer.module.css';
import { Pagination } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResellerCustomer() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setAllPage] = useState(0);
  const [allResellerCustomer, setAllResellerCustomer] = useState([]);
  const { id } = useParams();
  console.log(id);
  /////////////////////// START GET TRANSACTION FUNCTION////////////////
  const getResellerCustomer = async (page) => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/admin/resellerSubscriptions?page=${page}&id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAllResellerCustomer(data.subscriptions);
        setCurrentPage(data.page);
        setAllPage(data.totalPages);

      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
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
    }
  };



  useEffect(() => {
    getResellerCustomer(1)
  }, [])

  const onPageChange = (page) => {
    setCurrentPage(page)
    getResellerCustomer(page)
  };

  /////////////////////// END GET TRANSACTION FUNCTION////////////////


  return (
    <>
      <section className='pb-10 pl-20 px-9'>

        <div className={`${styles.dashboard_options} mt-28 flex items-center justify-around`}>
          <h1 className='font-semibold text-[20px]'>Reseller Customer</h1>



          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className={`${styles.searchInput} relative w-[50%]`}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>

            </div>
            <input onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full h-11 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="button"
            className={`${styles.btn_filter} text-white  border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-black`}>
            Filter<i class="fa-solid fa-caret-down ml-2"></i></button>
        </div>

        <div className={`${styles.resellerCustomer_table} `}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
              <tr>
                <th scope="col" className="px-6 py-3">App Name</th>
                <th scope="col" className="px-6 py-3">Mac address</th>
                <th scope="col" className="px-6 py-3">Package</th>
                <th scope="col" className="px-6 py-3">Expiry date</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {allResellerCustomer.map((item, index) => (
                <tr>
                  <td scope="col" className="px-6 py-4">Wish</td>
                  <td scope="col" className="px-6 py-3">{item.userId.macAddress}</td>
                  <td scope="col" className="px-6 py-3">1 year</td>
                  <td scope="col" className="px-6 py-3">{item.subscriptionEndDate}</td>
                  <td scope="col" className="px-6 py-3">{item.isActive === true ?
                    'Active' : item.isActive === false ?
                      'Not Active' : 'PostPone'}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>

        <div className='flex items-center justify-between pl-4 pr-4'>
          <h3>Showing {currentPage} to {totalPages} of {totalPages}</h3>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>

        </div>


      </section>
    </>
  )
}
