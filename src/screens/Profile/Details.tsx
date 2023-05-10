import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../services/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../../services/User'
import { getUserProfile } from '../../utils/Operations'
import { UsernameEdit } from '../../components'


const Details = ({user, isCurrent}: any) => {
    const Navigate = useNavigate()
    const { theme, isAuth } = useSelector((state: any) => state)
    const [loading, setLoading] = useState<boolean>(false)
    const [editUsername, setEditUsername] = useState(false)

    return (
        <div
            className=' outline flex flex-1 justify-center md:pl-36 p-4 '
        >
            {editUsername && <UsernameEdit toggle={setEditUsername} />}
            <div className='outline flex-grow max-w-[1000px] p-4'>
                <div className=' grid grid-flow-col grid-cols-3 gap-6 '>
                    <div className=' outline col-span-1 flex justify-center items-center '>
                        <img
                            className=' md:w-[150px] md:h-[150px] rounded-full object-cover overflow-hidden'
                            src={user.profileImage ? user.profileImage : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                            alt="" />
                    </div>
                            {editUsername && <h1> edit username </h1>}
                    <div className=' outline col-span-2 p-2 gap-4 flex flex-col '>
                        <div className=' flex gap-4'>
                            <h1
                                onClick={() => {
                                    if (isCurrent) {
                                        console.log('edit username')
                                        setEditUsername(true)
                                    }
                                }}
                                className={` ${isCurrent ? 'cursor-pointer hover:opacity-70' : ''} font-bold `}
                                >
                                {user.username}
                                {/* edit */}
                                {isCurrent && '#'}
                            </h1>
                            {isCurrent && <>
                                <h1>
                                    {user.username}
                                </h1>
                                <h1>
                                    {user.username}
                                </h1>
                            </>}
                        </div>
                        <div className='flex gap-4'>
                            <h1>
                                {user.Posts.length} posts
                            </h1>
                            <h1>
                                {user.Followers.length} followers
                            </h1>
                            <h1>
                                {user.Following.length} following
                            </h1>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1>
                                {user.name}
                            </h1>
                            {user.bio &&
                                <h1>
                                    {user.bio}
                                </h1>
                            }
                            {user.website &&
                                <a href={user.website}>
                                    {user.website}d
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <button onClick={async () => {
                    await logout()
                    // Navigate('/accounts/login')
                }}>Logout</button>
            </div>
        </div>
    )
}

export default Details