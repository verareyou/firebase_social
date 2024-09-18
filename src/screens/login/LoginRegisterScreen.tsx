import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import RegisterForm from './RegisterForm'
import { ConnectWallet } from '@thirdweb-dev/react'

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
        <div
          className='fixed top-0 right-0 p-4 z-50'
        >
        <ConnectWallet
        />
        </div>
      <RegisterForm />
    </div>
  )
}

export default LoginRegisterScreen