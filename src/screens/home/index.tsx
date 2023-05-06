import React, { useEffect } from 'react'
import Draggable from '../../components/Draggable'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { logout } from '../../services/Auth'
import { SetUser } from '../../redux/Slice'

const HomePage = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state: any) => state)


  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])

  const SignOut = async () => {
    await logout()
  }

  return (
    <div className='text-white min-h-screen flex flex-col '>
      {isAuth && user.username}
      <button onClick={() => SignOut()}>Logout</button>
    </div>
  )
}

export default HomePage