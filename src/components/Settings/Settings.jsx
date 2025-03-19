import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Settings.module.css';

import LoginDetails from '../LoginDetails/LoginDetails';
import DemoUrl from '../DemoUrl/DemoUrl';


export default function Settings() {
  
  const [isOpen, setIsOpen] = useState(false);
 const [routeName, setRouteName] = useState('Login Details');


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  const handleSelect = (option) => {
    setRouteName(option);
    setIsOpen(false);
  };


 

  return (
    <>
<section className={`${styles.settingSection}`}>
     <div className={`${styles.dropdownMenu_setiing} relative flex mt-28`}>
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
                    className={`${styles.dropdown} absolute mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
                  >
                    <ul className={`${styles.dropDownSelected} py-2 text-sm text-gray-700 dark:text-gray-200`}>
                      <li>
                        <a
                          href="#"
                          onClick={() => handleSelect("Login Details")}
                          className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Login Details
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => handleSelect("Demo M3u Url")}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Demo M3u Url
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {routeName == 'Login Details' ? <LoginDetails /> : <DemoUrl />}
              </section>
    </>
  )
}
