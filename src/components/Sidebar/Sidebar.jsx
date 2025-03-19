import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import flagEn from '../../assets/Image/FlagKingdom.svg'
import flagAr from '../../assets/Image/egypt.png'
import logo from '../../assets/Image/wishlogo.png'
import { toast } from 'react-toastify';
export default function Sidebar() {
  const [isHoveredEditeContent, setIsHoveredEditeContent] = useState(false);
  const [isHoveredCustomer, setIsHoveredCustomer] = useState(false);
  const [isHoveredReseller, setIsHoveredReseller] = useState(false);
  const [isHoveredSetting, setIsHoveredSetting] = useState(false);
  const [isHoveredLogOut, setIsHoveredLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("")

  function handleLogOut() {
    localStorage.removeItem("authToken")
    window.location.reload()
  }
  // const languages = [
  //   { code: 'EN', name: 'English', flag: `${flagEn}` },
  //   { code: 'AR', name: 'Arabic', flag: `${flagAr}` },
  // ];

  // const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // const handleLanguageChange = (language) => {
  //   setSelectedLanguage(language.code);
  //   setIsOpen(false);
  //   // Add translation logic here if necessary
  // };
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
  useEffect(() => {
    adminInfo()
  }, [])


  return (
    <>


      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className={`${styles.navbar} px-3 py-3 lg:px-5 lg:pl-3`}>
          <div className="flex items-center justify-between">
            <div className={`${styles.logo_sidebar} flex items-center justify-start rtl:justify-end ml-20`}>
              <button onClick={toggleSidebar} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  <img src={logo} className='w-10' alt="" />
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <h1 className={`${styles.user} font-bold mr-1`}>Hi {userName}</h1>
                {/* <div className="relative inline-block text-left">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={languages.find((lang) => lang.code === selectedLanguage)?.flag}
                      alt="Flag"
                      className="w-5 h-5 rounded-sm"
                    />
                    <span className="text-gray-700 font-medium">{selectedLanguage}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>


                  {isOpen && (
                    <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg">
                      {languages.map((language) => (
                        <div
                          key={language.code}
                          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleLanguageChange(language)}
                        >
                          <img src={language.flag} alt={language.name} className="w-5 h-5 rounded-sm mr-2" />
                          <span className="text-gray-700">{language.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
                <i class={`fa-solid fa-bell ${styles.notifications} mr-1`}></i>
              </div>
            </div>
          </div>
        </div>
        <aside id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:w-16 lg:h-screen`}
          aria-label="Sidebar">
          <button type="button" onClick={toggleSidebar}
            className={`${styles.close_sidebar} absolute top-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white`} data-modal-toggle="crud-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="h-full px-3 pb-4 overflow-y-auto bg-black dark:bg-gray-800 flex justify-center flex-col">
            <ul className="space-y-2 font-medium absolute">
              <li
                className={`${styles.hover_container} ${isHoveredEditeContent ? `${styles.hovered}` : ""}`}
                onMouseEnter={() => setIsHoveredEditeContent(true)}
                onMouseLeave={() => setIsHoveredEditeContent(false)}
              >
                <NavLink className={'flex justify-center items-center'} to={"editContent"}>
                  <i className={`fa-solid fa-qrcode ${styles.icon}`}></i>

                  {isHoveredEditeContent && (
                    <span className={`hover_text ml-1`}>
                      Edite Content
                    </span>
                  )}
                </NavLink>

              </li>
              <li
                className={`${styles.hover_container} ${isHoveredCustomer ? `${styles.hovered}` : ""}`}
                onMouseEnter={() => setIsHoveredCustomer(true)}
                onMouseLeave={() => setIsHoveredCustomer(false)}
              >
                <NavLink className={'flex justify-center items-center'} to={"customer"}>
                  <i className={`fa-solid fa-user ${styles.icon}`}></i>

                  {isHoveredCustomer && (
                    <span className={`hover_text ml-1`}>
                      Customer
                    </span>
                  )}
                </NavLink>

              </li>
              <li
                className={`${styles.hover_container} ${isHoveredReseller ? `${styles.hovered}` : ""}`}
                onMouseEnter={() => setIsHoveredReseller(true)}
                onMouseLeave={() => setIsHoveredReseller(false)}
              >
                <NavLink className={'flex justify-center items-center'} to={"reseller"}>
                  <i className={`fa-solid fa-users ${styles.icon}`}></i>

                  {isHoveredReseller && (
                    <span className={`hover_text ml-1`}>
                      Reseller
                    </span>
                  )}
                </NavLink>

              </li>

              <li
                className={`${styles.hover_container} ${isHoveredSetting ? `${styles.hovered}` : ""}`}
                onMouseEnter={() => setIsHoveredSetting(true)}
                onMouseLeave={() => setIsHoveredSetting(false)}
              >
                <NavLink className={'flex justify-center items-center'} to={"setting"}>
                  <i className={`fa-solid fa-gear ${styles.icon}`}></i>

                  {isHoveredSetting && (
                    <span className={`hover_text ml-1`}>
                      Setting
                    </span>
                  )}
                </NavLink>

              </li>
              <li
                className={`${styles.hover_container} ${isHoveredLogOut ? `${styles.hovered}` : ""}`}
                onMouseEnter={() => setIsHoveredLogOut(true)}
                onMouseLeave={() => setIsHoveredLogOut(false)}
              >
                <NavLink className={'flex justify-center items-center'} to={"/"} onClick={handleLogOut}>
                  <i className={`fa-solid fa-power-off ${styles.iconLogOut}`}></i>

                  {isHoveredLogOut && (
                    <span className={`${styles.hover_text_logOut} ml-1`}>
                      Logout
                    </span>
                  )}
                </NavLink>

              </li>
            </ul>
          </div>
        </aside>

      </nav>




    </>
  )
}
