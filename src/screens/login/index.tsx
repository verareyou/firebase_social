import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ResizeFile } from '../../utils/ResizeImage'
import RegisterForm from './RegisterForm'
import { redirect, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'

const LoginRegisterPage = () => {
  const {isAuth, name, user} = useSelector((state: any) => state)
  const navigate = useNavigate()

  useEffect(() => {
  if( isAuth ) {
    navigate('/')
  }
  }, [isAuth])

  return (
    <div className=' h-full text-white '>
      <RegisterForm />
      <div>
        {isAuth && auth.currentUser?.email}
      </div>
    </div>
  )
}

export default LoginRegisterPage