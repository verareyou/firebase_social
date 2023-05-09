import React, { useEffect, useState } from 'react'
import { logout } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const Navigate = useNavigate()
    const { user, theme, isAuth } = useSelector((state: any) => state)
    
    useEffect(() => {
        if (!isAuth) {
            // console.log('not auth')
            Navigate('/accounts/login')
        }
    }, [isAuth])
    const [followers, setFollowers] = useState([user.followers])
    return (
        <div 
        style={{
            backgroundColor: theme.background,
        }}
        className=''>

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
                    <h2>Followers: {followers.length - 1}</h2>
                    <h2>Following: {user.following}</h2>
                </div>
            </div>

            <button onClick={async () => {
                await logout()
                // Navigate('/accounts/login')
            }}>Logout</button>
        </div>
    )
}

export default ProfileScreen