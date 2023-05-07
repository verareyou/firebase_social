import React, { useState } from 'react'
import { logout } from '../../../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
    const Navigate = useNavigate()
    const { user } = useSelector((state: any) => state)

    const [followers, setFollowers] = useState([user.followers])
  return (
    <div className='text-white'>

        <div>
            <h1>Profile</h1>
            <img 
            className='w-20 h-20 rounded-full'
            src={user.profileImage ? user.profileImage : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
            alt="" />
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <div 
            className='flex flex-row'
            >
                <h2>Followers: {followers.length - 1 }</h2>
                <h2>Following: {user.following}</h2>
            </div>
        </div>

        <button onClick={ async () => {
            Navigate('/')
            await logout()
        }}>Logout</button>
    </div>
  )
}

export default Profile