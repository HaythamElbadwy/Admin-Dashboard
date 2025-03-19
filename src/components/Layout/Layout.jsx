import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Layout.module.css';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
  const [first, setfirst] = useState()
  useEffect(() => { }, [])

  return (
    <>
      <Sidebar />

      <Outlet />

      <Footer />
    </>
  )
}
