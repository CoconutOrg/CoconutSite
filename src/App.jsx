import { useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useNavigation } from 'react-router'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng) => {
    useEffect(() => {
      i18n.changeLanguage(lng);
    }, [])
  };

  return (
    <>
    <Outlet />
    </>
  )
}

export default App
