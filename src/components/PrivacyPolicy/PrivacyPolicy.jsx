import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './PrivacyPolicy.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

export default function PrivacyPolicy() {
  const [editorHtml, setEditorHtml] = useState('');
  const [inputHtml, setInputHtml] = useState(''); // State for new HTML input
  const [isLoading, setIsLoading] = useState(false);

  const addPrivacyPolicy = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/footerContent/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `wisOZ0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ content: editorHtml, page: "Privacy_Policy" })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message , {
          theme : 'dark'
        })
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.' , {
              theme : 'dark'
            });
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };

  const getPrivacyPolicy = async () => {
    try {
      const response = await fetch(`https://wish-omega-blush.vercel.app/footerContent/get?page=Privacy_Policy`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEditorHtml(data.footerContent.content)
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
    getPrivacyPolicy()
  }, [])


  // Handle change in the editor
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  // Function to set existing HTML content in the editor
  const setHtmlToEditor = () => {
    setEditorHtml(inputHtml); // Set the HTML content in the editor
  };

  // Handle save action
  const handleSave = () => {
    console.log('HTML Content:', editorHtml);
    addPrivacyPolicy()
  };

  return (
    <>
      <div className={`${styles.privacy_policy} mt-5 pb-10 pl-20 px-9`}>
        <ReactQuill
          value={editorHtml}
          onChange={handleChange}

          style={{
            height: "60vh",
            padding: '10px',
            marginLeft: "10px"
          }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }, { font: [] }, { size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ 'align': [] }],
              ['undo', 'redo']
            ],
          }}
        />

        <div className='flex justify-end mb-5'>
          <button onClick={handleSave} type='button'
            className={`${styles.btn_privacy_policy} bg-blue-800 text-white mt-12 w-28  h-10 rounded-md ml-auto`}>
            {isLoading ? <i className='fas fa-spinner fa-spin text-2xl'></i>
              : 'Submit'}
          </button>

        </div>
      </div>


    </>
  )
}
