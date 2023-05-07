import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Profile from './ProfileScreen/Profile'
import { useSelector } from 'react-redux'

const HomeHandler = () => {
  const { user } = useSelector((state: any) => state)
  const navigate = useNavigate()
  return (
    <div>
      <h1>Home</h1>
      <h1
        className='text-white'
        onClick={() => {
          navigate(`/${user.username}`)
        }
        }
      >
        profile
      </h1>
    </div>
  )
}

export default HomeHandler