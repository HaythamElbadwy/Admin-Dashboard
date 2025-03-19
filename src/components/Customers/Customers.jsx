import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Customers.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import Playlists from '../Playlists/Playlists';

export default function Customers() {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [routeName, setRouteName] = useState('Transaction');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleSelect = (option) => {
    setRouteName(option);
    setIsOpen(false);
  };
  useEffect(() => { }, [])

  return (
    <>
      <section className={`${styles.transaction_device_dashboard} pb-10 pl-20 px-9`}>
        <div className={`${styles.total_subscribe} flex items-center justify-center gap-16 mt-20`}>
          <div className={`${styles.monthlySupscripe}  w-60 h-28`}>
            <p className='text-white text-xs pt-3 text-start pl-[1.5rem]'>Monthly Supscribe</p>
            <div className='flex items-center justify-around font-semibold text-3xl text-white pt-1'>
              <h1>200</h1>
              <h1>3000$</h1>
            </div>
            <div className='flex items-center justify-end mr-4 mt-2'>
              <h3 className='text-white pr-2 text-xs'><span className='text-green-400'>+</span>10.02%</h3>
              <i class="fa-solid fa-arrow-trend-up text-green-400"></i>
            </div>
          </div>

          <div className={`${styles.totalCustomer}  w-60 h-28`}>
            <p className='text-white text-xs pt-3 text-start pl-[1.5rem]'>Total Customer</p>
            <div className='flex items-center justify-start pl-[1.5rem] font-semibold text-3xl text-white pt-2'>
              <h1>6000</h1>
            </div>

            <div className='flex items-center justify-end mr-4 mt-2'>
              <h3 className='text-white pr-2 text-xs'><span className='text-green-400'>+</span>10.02%</h3>
              <i class="fa-solid fa-arrow-trend-up text-green-400"></i>
            </div>
          </div>
        </div>
        <div className={`${styles.dropdownMenu} relative flex`}>
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className={`${styles.dropdownDefaultButton} text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
            type="button"
          >
            {routeName}
            <svg
              className="w-2.5 h-2.5 ml-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              id="dropdown"
              className={`${styles.dropdown} absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul className={`${styles.dropDownSelected} py-2 text-sm text-gray-700 dark:text-gray-200`}>
                <li>
                  <a
                    href="#"
                    onClick={() => handleSelect("Transaction")}
                    className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Transaction
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleSelect("Device")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Device
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>


        {routeName == 'Transaction' ? <Transaction   /> : <Playlists  />}

      </section>

    </>

  )
}
