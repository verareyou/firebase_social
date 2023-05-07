import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { logout } from '../../services/Auth'
import { SetUser } from '../../redux/Slice'
import HomeHandler from './HomeHandler'

const HomePage = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state: any) => state)
  // console.log(isAuth, user)

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login')
  //     return
  //   }
  // }, [isAuth])

  const SignOut = async () => {
    navigate('/login')
    await logout()
  }

  return (
    <div className='text-white min-h-screen flex flex-col '>
      
      {
        isAuth ? <HomeHandler /> : (
          <button onClick={() => navigate('/login')}>Login</button>
        )}
    </div>
  )
}

export default HomePage