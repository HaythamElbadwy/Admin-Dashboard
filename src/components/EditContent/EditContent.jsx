import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './EditContent.module.css';
import Faqs from '../Faqs/Faqs';
import Activation from '../Activation/Activation';
import TermsCondition from '../TermsCondition/TermsCondition';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

export default function EditContent() {
  const [selectEditContent, setSelectEditContent] = useState('Faqs');
  const [isOpenEditContent, setIsOpenEditContent] = useState(false);
  useEffect(() => { }, [])

  const toggleDropdownEditContent = () => {
    setIsOpenEditContent(!isOpenEditContent);
  }

  const handleSelectEditContent = (option) => {
    setSelectEditContent(option);
    setIsOpenEditContent(false);
  };
  return (
    <>
      <div className={`${styles.dropdown_editecontent} relative flex mt-20 pl-24`}>
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdownEditContent}
          className={`${styles.dropdownDefaultButton} text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
          type="button"
        >
          {selectEditContent}
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
        {isOpenEditContent && (
          <div
            id="dropdown"
            className="absolute mt-[2.8rem] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul className={`${styles.dropDownSelected} py-2 text-sm text-gray-700 dark:text-gray-200`}>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectEditContent("Faqs")}
                  className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Faqs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectEditContent("TermsCondition")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Terms & conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectEditContent("PrivacyPolicy")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleSelectEditContent("Activation")}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Activation
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {(() => {
        switch (selectEditContent) {
          case "Faqs":
            return <Faqs />;
          case "TermsCondition":
            return <TermsCondition />;
          case "PrivacyPolicy":
            return <PrivacyPolicy />;
          case "Activation":
            return <Activation />;
          default:
            return <div>No Component Found</div>; // Optional: Handle unknown routes
        }
      })()}
    </>
  )
}
