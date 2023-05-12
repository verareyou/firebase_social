import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Profile from '../Profile/ProfileScreen'
import { useSelector } from 'react-redux'
import { SideBar } from '../../components'
import { NavigateProfile } from '../../utils/Operations'

const HomeScreen = () => {
  const { user, theme, isAuth } = useSelector((state: any) => state)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      return navigate('/accounts/login')
    }
  }, [isAuth])

  return (
    <div
      className=' min-h-screen flex flex-col overflow-x-hidden justify-center items-center'

      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <SideBar /> 
      <h1>Home</h1>
      <h1 onClick={() => {
        // NavigateProfile('himanshuu',user,navigate)
        navigate(`/${user.username}`)
      }} >
        profile
      </h1>
    </div>
  )
}

export default HomeScreen