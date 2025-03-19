import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Activation.module.css';
import { toast } from 'react-toastify';

export default function Activation() {
  const [price, setPrice] = useState("");
  const [puplishKey, setpuplishKey] = useState("");
  const [secretKey, setsecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPaymentKey, setIsLoadingPaymentKeys] = useState(false);

  /////////////////////// START GET PRICE////////////////////
  const getPrice = async () => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/price/get`, {
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
        setPrice(data.subscriptionPrice.price);
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
    getPrice()
  }, [])


  /////////////////////////END GET PRICE///////////////////////////

  /////////////////////////////START ADD PRICE////////////////////////////////

  const addPrice = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/price/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ price: price })
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
    if (price == '') {
      toast("All faildes is Rquired!")
    } else {
      addPrice()
    }

  }
  ////////////////////////END ADD PRICE////////////////////////////////

  /////////////////////// START GET PRICE////////////////////
  const getPaymentKeys = async () => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/apiKey/get`, {
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
        setPrice(data.subscriptionPrice.price);
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
    getPaymentKeys()
  }, [])


  /////////////////////////END GET PRICE///////////////////////////

  /////////////////////////////START ADD PAYMENT KEYS////////////////////////////////

  const addPaymentKeys = async () => {
    setIsLoadingPaymentKeys(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/apiKey/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ publishableKey: puplishKey, secretKey: secretKey })
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
      setIsLoadingPaymentKeys(false)
    }
  };

  function handleAddPaymentKeys() {
    if (puplishKey == '' || secretKey == '') {
      toast("All faildes is Rquired!")
    } else {
      addPaymentKeys()
    }

  }
  ////////////////////////END ADD PAYMENT KEYS////////////////////////////////

  return (
    <>


      <form className={`${styles.form_activation} mt-5 w-[90%] h-1/2 ml-[6rem] mr-[96px]`}>
        <h1 className='flex text-2xl font-bolder mb-3 text-gray-800'>Price</h1>
        <div className="mb-5 mr-auto">
          <label htmlFor="activationprice" className="flex mb-4 text-sm font-medium text-gray-900 dark:text-white">Activation price</label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} id="activationprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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

      <form className={`${styles.form_activation} mt-5 w-[90%] h-1/2 ml-[6rem] mr-[96px] mb-12`}>
        <h1 className='flex text-2xl mb-3 text-gray-800'>Payment Keys</h1>
        <div className="mb-5 mr-auto">
          <label htmlFor="puplishKey" className="flex mb-4 text-sm font-medium text-gray-900 dark:text-white">Puplish Key</label>
          <input type="text" id="puplishKey" onChange={(e) => setpuplishKey(e.target.value)} value={puplishKey} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5 mr-auto">
          <label htmlFor="secretKey" className="flex mb-4 text-sm font-medium text-gray-900 dark:text-white">Secret Key</label>
          <input type="text" id="secretKey" onChange={(e) => setsecretKey(e.target.value)} value={secretKey} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className='flex'>
          <button type="submit"
          onClick={handleAddPaymentKeys}
            className="ml-auto text-white bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-28  px-5 py-2.5 text-center">
            {isLoadingPaymentKey ?
              <i className='fas fa-spinner fa-spin text-2xl'></i>
              : 'Save'}</button>

        </div>
      </form>
    </>
  )
}
