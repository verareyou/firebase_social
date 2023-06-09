import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/Auth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUserByUsername } from '../../services/User'
import { getUserProfile } from '../../utils/Operations'
import { Button, UsernameEdit } from '../../components'
import EditProfile from './EditProfile'

import userpng from '../../assets/Icons/user.png';
import ProfilePosts from './ProfilePosts'
import { SetUser, setLoading } from '../../redux/userSlice'
import { FollowUser } from '../../services/UserMutations'
import FollowingModel from '../../components/Following/FollowingModel'



const Details = ({ user, isCurrent, Follow, following, }: any) => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const params = useParams()
    const { theme, isAuth, user: currentUser } = useSelector((state: any) => state)
    const [editUsername, setEditUsername] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [followersModel, setFollowersModel] = useState(false)
    const [followingModel, setFollowingModel] = useState(false)

    useEffect(() => {
        const isEdit = window.location.pathname.split('/')[2] === 'edit'
        const isFollowing = window.location.pathname.split('/')[2] === 'following'
        const isFollowers = window.location.pathname.split('/')[2] === 'followers'
        setEditProfile(isEdit)
        setFollowingModel(isFollowing)
        setFollowersModel(isFollowers)
    }, [window.location.pathname])
    return (
        <div
            className=' w-[100vw] flex flex-1 flex-col items-center md:pl-[100px] '
        >
            {editUsername && <UsernameEdit toggle={setEditUsername} />}
            {editProfile && <EditProfile toggle={setEditProfile} />}
            {followersModel && <FollowingModel toggle={setFollowersModel} ids={user.Followers} type='followers' />}
            {followingModel && <FollowingModel toggle={setFollowingModel} ids={user.Following} type='following' />}
            <div className=' flex-grow items-center flex-col flex w-full max-w-[1000px]'>

                {/* upper profile details */}
                <div
                    style={{
                        // backgroundColor: theme.secBackground,
                        // border: `1px solid ${theme.lightBorder}`
                    }}
                    className={` ${!user.bio && !user.website && 'md:flex-col'} flex flex-col md:flex-row w-full items-center justify-center py-4 gap-2 md:px-4 md:py-8`}
                >

                    <div className=' flex flex-col gap-4 justify-center items-center '>
                        <img
                            className=' md:h-[150px] h-[100px] md:w-[150px] w-[100px] rounded-full object-cover overflow-hidden'
                            src={user.profileImage ? user.profileImage : userpng}
                            alt="" />
                        <div className=' flex justify-center items-center gap-4'>
                            <div
                                className={` flex flex-row gap-4 `}
                            >
                                <div>
                                    <h1
                                        onClick={() => {
                                            if (isCurrent) {
                                                console.log('edit username')
                                                setEditUsername(true)
                                            }
                                        }}
                                        className={` ${isCurrent ? 'cursor-pointer flex items-center flex-row hover:opacity-70' : ''} font-bold `}
                                    >
                                        {user.username}
                                        {/* edit */}
                                        {isCurrent && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 -mt-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                                        </svg>}
                                    </h1>
                                    <h1 className=' text-sm text-gray-500'>
                                        {user.name}
                                    </h1>
                                </div>
                                <div>
                                    {!isCurrent && <Button
                                        tailw='px-6 py-[8px]'
                                        text={following ? 'Following' : 'Follow'}
                                        theme={theme}
                                        onClick={Follow}
                                    />}
                                </div>
                            </div>

                            {isCurrent && <>
                                <Button
                                    style={{
                                        backgroundColor: theme.text,
                                        color: theme.background
                                    }}
                                    // tailw='px-2 py-[5px]'
                                    text='Edit Profile'
                                    theme={theme}
                                    onClick={() => {
                                        Navigate(`/${user.username}/edit`)
                                    }}
                                />
                            </>}
                        </div>
                    </div>
                    <div className=' flex flex-col h-full justify-center gap-4 '>
                        <div className={`flex gap-2 justify-center items-center ${!user.bio && !user.website && isCurrent ? ' flex-row' : 'flex-col '}`
                        }>
                            {user.bio ?
                                <h1
                                    style={{
                                        backgroundColor: theme.secBackground,
                                    }}
                                    className={`text-sm max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl`}
                                >
                                    {user.bio}
                                </h1>
                                : <>
                                    {isCurrent &&
                                        <a
                                            onClick={() => {
                                                Navigate('/accounts/edit')
                                            }}

                                            className=' text-blue-500 cursor-pointer text-[14px]'
                                        >
                                            Add bio
                                        </a>
                                    }
                                </>
                            }
                            {user.website ?
                                <a
                                    target='_blank'
                                    className=' cursor-pointer text-[12px] hover:underline'
                                    href={user.website}>
                                    {user.website.replace(/(^\w+:|^)\/\//, '')}
                                </a>
                                : <>
                                    {isCurrent &&
                                        <a
                                            onClick={() => {
                                                Navigate('/accounts/edit')
                                            }}

                                            className=' text-blue-500 cursor-pointer text-[14px]'
                                        >
                                            Add website
                                        </a>
                                    }
                                </>
                            }
                        </div>
                        <div className='flex justify-center items-center gap-4'>
                            {/* <h1>
                                {user.Posts.length} posts
                            </h1> */}
                            <h1
                                onClick={() => {
                                    Navigate(`/${user.username}/followers`)
                                }}

                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {user.Followers.length} followers
                            </h1>
                            <h1
                                onClick={() => {
                                    Navigate(`/${user.username}/following`)
                                }}
                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {user.Following.length} following
                            </h1>
                        </div>
                    </div>

                </div>

                {/* posts */}


                <div
                    className=' w-full my-4'
                    style={{
                        borderBottom: `1px solid ${theme.lightBorder}`
                    }}
                />
                <ProfilePosts
                    user={user}
                    isCurrent={isCurrent}
                />
                {/* <button onClick={async () => {
                    dispatch(setLoading(true))
                    await logout()
                    Navigate('/')
                    dispatch(setLoading(false))
                }}>Logout</button> */}

            </div>
        </div>
    )
}

export default Details