import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Faqs.module.css';
import { toast } from 'react-toastify';

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isShowPopupDelete, setIsShowPopupDelete] = useState(false);
  const [isShowPopupEdite, setIsShowPopupEdite] = useState(false);
  const [isShowPopupAdd, setIsShowPopupAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [faqs, setFaqs] = useState([]);
  const [FaqId, setFaqId] = useState();

  ///START ADD FAQS///
  const addFaqs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/faq/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ question, answer })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message , {
          theme : 'dark'
        })
        setIsShowPopupAdd(false)
        clearInput()
        setFaqs(data.allFaq)
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

  function handleAdd() {
    if (question == '' || answer == '') {
      toast.error("All faildes is Rquired!", {
        theme: 'dark'
      })
    } else {
      addFaqs()

    }
  }
  ///END ADD FAQS///

  //////////////////////START GET FAQS////////////////////////////////
  const getFaqs = async () => {

    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/faq/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFaqs(data.allFaq)
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
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getFaqs()
  }, [])
  ////////////////////////END GET FAQS//////////////////////////////// 

  //////////////////////START EDITE FAQS///////////////////////////////

  const editeFaqs = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/faq/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ question, answer })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsShowPopupEdite(false)
        clearInput()
        setFaqs(data.allFaq)
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

  function clearInput() {
    setAnswer('')
    setQuestion('')
  }

  function hundleUpdate() {
    if (question == '' || answer == '') {

      toast("All faildes is Rquired!")
    } else {
      editeFaqs(FaqId)

    }
    console.log("question", question, "answer", answer);

  }

  //////////////////END EDITE FAQS//////////////////////////////


  /////////////////START DELETE FAQS////////////////////////////

  const delteFaqs = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/faq/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message)
        setIsShowPopupDelete(false)
        setFaqs(data.allFaq)
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
  function handleDelete() {
    delteFaqs(FaqId)
  }
  //////////////////////END DELETE FAQS//////////////////////////
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently open accordion
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };
  function openPopup(faqId) {
    setIsShowPopupDelete(true);
    setFaqId(faqId);
  }
  function openPopupEdite(data) {
    setIsShowPopupEdite(true);
    setAnswer(data.answer);
    setQuestion(data.question);
    setFaqId(data._id);
  }
  function openPopupAdd() {
    setIsShowPopupAdd(true)
    clearInput()
  }



  return (
    <>
      <section className="bg-white  px-1" id='faqs'>
        <div className='flex justify-end pr-9'>
          <button type="button" onClick={openPopupAdd} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            <i class="fa-solid fa-plus mr-2"></i>Add Faqs</button>
        </div>


        <div className={`${styles.faqs_section} text-black p-4 rounded-lg mx-auto pl-24 pr-9`}>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              {/* Question */}
              <div
                className={`p-4 cursor-pointer border-solid border-2 border-black rounded-lg flex justify-between items-center ${activeIndex === index ? "border-b border-[#B269B9] bg-white text-black" : ""
                  }`}

              >
                <h3 className="text-[1rem] font-semibold">{faq?.question}</h3>
                <span className='flex items-center justify-center'>
                  <i class="fa-solid fa-pen text-blue-800 mr-2" onClick={() => openPopupEdite(faq)}></i>
                  <i class="fa-solid fa-trash text-red-600 mr-2" onClick={() => openPopup(faq._id)}></i>
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => toggleFAQ(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => toggleFAQ(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}

                </span>

              </div>

              {/* Answer with transition */}
              <div
                className={`${activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden transition-all duration-500 ease-in-out`}
              >
                <div className="p-4 bg-[#F1F1F1] rounded-lg mt-2 ">
                  <p className="text-base text-black">{faq?.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isShowPopupDelete ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button onClick={() => setIsShowPopupDelete(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-black">Are you sure to delete this faqs?</h3>
                <div className='flex justify-center items-center'>
                  <button type="button" onClick={handleDelete}
                    className="text-blue-700 mx-4 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Confirm'
                    }</button>
                  <button data-modal-hide="popup-modal" onClick={() => setIsShowPopupDelete(false)} type="button"
                    className="text-white mx-4 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : ''}
      {isShowPopupEdite ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Edite FAQS
                </h3>
                <button type="button" onClick={() => setIsShowPopupEdite(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="question" className="flex mb-2  font-medium text-gray-900 dark:text-white">Question</label>
                    <input type="text" onChange={(e) => setQuestion(e.target.value)} value={question} name="question" id="question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="flex mb-2  font-medium text-gray-900 dark:text-white">Answer</label>
                    <textarea id="description" onChange={(e) => setAnswer(e.target.value)} value={answer} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
                  </div>
                </div>
                <button type="submit" onClick={hundleUpdate} className="text-white inline-flex items-center bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                  {isLoading ?
                    <i className='fas fa-spinner fa-spin text-2xl'></i>
                    : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
        : ''}

      {isShowPopupAdd ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  ADD FAQS
                </h3>
                <button type="button" onClick={() => setIsShowPopupAdd(false)} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="question" className="flex mb-2  font-medium text-gray-900 dark:text-white">Question</label>
                    <input type="text" onChange={(e) => setQuestion(e.target.value)} value={question} name="question" id="question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="flex mb-2  font-medium text-gray-900 dark:text-white">Answer</label>
                    <textarea id="description" onChange={(e) => setAnswer(e.target.value)} value={answer} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
                  </div>
                </div>

                <button type="submit" onClick={handleAdd} className="text-white inline-flex items-center bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                  {isLoading ?
                    <i className='fas fa-spinner fa-spin text-2xl'></i>
                    : 'Save'}

                </button>
              </div>
            </div>
          </div>
        </div>
        : ''}
    </>
  )
}
