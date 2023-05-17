import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegisterForm from './RegisterForm'
import { redirect, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'

const LoginRegisterScreen = () => {
  const { isAuth, name, user, theme } = useSelector((state: any) => state)
  const navigate = useNavigate()

  // useEffect(() => {
  // if( isAuth ) {
  //   navigate('/')
  // }
  // }, [isAuth])

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
      className=' duration-300 min-h-screen flex flex-col justify-center items-center'
      >
      <RegisterForm />
      <div>
        {isAuth && auth.currentUser?.email}
      </div>
    </div>
  )
}

export default LoginRegisterScreen