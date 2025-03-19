import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Transaction.module.css';
import { Pagination } from "flowbite-react";
import { toast } from 'react-toastify';
export default function Transaction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setAllPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTransaction, setSearchTransaction] = useState('');
  const toggleDropdownFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedFilters(prevFilters =>
      checked ? [...prevFilters, id] : prevFilters.filter(filter => filter !== id)
    );
  };
  /////////////////////// START GET TRANSACTION FUNCTION////////////////
  const getTransaction = async (page) => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/subscription/getAll?page=${page}`, {
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
        setAllTransaction(data.subscriptions);
        setCurrentPage(data.page);
        setAllPage(data.totalPages)
        console.log(data.subscriptions);

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
    getTransaction(1)
  }, [])

  const onPageChange = (page) => {
    setCurrentPage(page)
    getTransaction(page)
  };

  // Apply filter to transactions
  const filteredTransactions = allTransaction.filter((item) =>
    selectedFilters.length === 0 || selectedFilters.includes(item.userId.type?.toLowerCase())
  );

  /////////////////////// END GET TRANSACTION FUNCTION////////////////
  // const filteredData = allTransaction.filter((t) => {
  //   const searchQueryCleaned = searchQuery.replace(/[:\-]/g, '').toLowerCase(); // Remove colons/hyphens from search query
  //   const macAddressCleaned = t.userId.macAddress.replace(/[:\-]/g, '').toLowerCase(); // Remove colons/hyphens from mac address

  //   const matchesSearch = macAddressCleaned.includes(searchQueryCleaned);
  //   return matchesSearch && matchesFilter;
  // });
  ///////////////////////////START SEARCH TRANSACTION CUSTOMER////////////////////////////////////
  const getSearch = async (macAddress) => {
    setSearchTransaction(macAddress);

    if (macAddress === '') {
      getTransaction(currentPage); // Fetch all transactions if search is cleared
      return;
    }

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/subscription/searchByMac?macAddress=${macAddress}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Apply device filter to the search results
        const filteredResults = data.subscriptions.filter(item =>
          selectedFilters.length === 0 || selectedFilters.includes(item.userId.type?.toLowerCase())
        );
        setAllTransaction(filteredResults);
      }

    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////END SEARCH TRANSACTION CUSTOMER////////////////////////////////////

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
      <div className={`${styles.transaction_table} `}>
        <table className='table-auto w-full '>
          <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
            <tr>
              <th scope="col" className="px-6 py-3">Mac address</th>
              <th scope="col" className="px-6 py-3">Device type</th>
              <th scope="col" className="px-6 py-3">Pay Amount</th>
              <th scope="col" className="px-6 py-3">Payment time</th>
              <th scope="col" className="px-6 py-3">Expiry date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item, index) => (
                <tr>
                  <td scope="col" className="px-6 py-4">{item.userId.macAddress}</td>
                  <td scope="col" className="px-6 py-3">{item.userId.type}</td>
                  <td scope="col" className="px-6 py-3">{item.cost}</td>
                  <td scope="col" className="px-6 py-3">{item.time}</td>
                  <td scope="col" className="px-6 py-3">{item.subscriptionEndDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-2 text-gray-500">
                  No matching results found
                </td>
              </tr>
            )
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
    </>
  )
}
