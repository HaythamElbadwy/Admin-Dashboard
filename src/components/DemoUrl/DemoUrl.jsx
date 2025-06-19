import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './DemoUrl.module.css';
import { toast } from 'react-toastify';

export default function DemoUrl() {
  const [demoUrl, setDemoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { }, [])

/////////////////////// START GET  DEMO M3U URL////////////////////
    const getDemoM3u = async () => {

      try {
        const response = await fetch(`https://wish-seven-gules.vercel.app/demo/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
  
  
        if (response.ok) {
          toast.success(data.message, {
            theme: "dark"
          });
          setDemoUrl(data.demo.url);
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
      getDemoM3u()
    }, [])
  
  
/////////////////////////END GET DEMO M3U URL//////////////////////

  /////////////////////////////START ADD DEMO URL////////////////////////////////

  const addDemoUrl = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-seven-gules.vercel.app/demo/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ url: demoUrl })
      });

      const data = await response.json();

      if (response.ok) {
        // getResellerCustomer(currentPage)
        toast.success(data.message, {
          theme: 'dark'
        })
        // setIsNewResellerCustomer(false)
        clearInput()

      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
          case 400:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
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
    if (demoUrl == '') {
      toast("All faildes is Rquired!")
    } else {
      addDemoUrl()
    }

  }
////////////////////////END ADD DEMO URL////////////////////////////////

  return (
    <>
      <form className={`${styles.form_activation} mt-5 w-[90%] h-1/2 ml-[6rem] mr-[96px]`}>
        <div className="mb-5 mr-auto">
          <label htmlFor="url" className="flex mb-4 text-sm font-medium text-gray-900 dark:text-white">URL</label>
          <input type="text" onChange={(e) => setDemoUrl(e.target.value)} value={demoUrl} id="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='flex'>
          <button type="submit"
            onClick={handleAdd}
            className="ml-auto text-white bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-28  px-5 py-2.5 text-center">
            {isLoading ?
              <i className='fas fa-spinner fa-spin text-2xl'></i>
              : 'Save'}</button>
        </div>
      </form>
    </>
  )
}
