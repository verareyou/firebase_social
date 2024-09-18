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



const Details = ({ user: refUser, isCurrent, Follow, following, subscribe, isSubscribed }: any) => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const params = useParams()
    const { theme, isAuth, user } = useSelector((state: any) => state)
    const [currentUser, setCurrentUser] = useState<any>(refUser)
    const [editUsername, setEditUsername] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [followersModel, setFollowersModel] = useState(false)
    const [followingModel, setFollowingModel] = useState(false)
    const [subscribersModel, setSubscribersModel] = useState(false)
    const [subscribedModel, setSubscribedModel] = useState(false)

    useEffect(() => {

        const isEdit = window.location.pathname.split('/')[2] === 'edit'
        const isFollowing = window.location.pathname.split('/')[2] === 'following'
        const isFollowers = window.location.pathname.split('/')[2] === 'followers'
        const isSubscribers = window.location.pathname.split('/')[2] === 'subscribers'
        const isSubscribed = window.location.pathname.split('/')[2] === 'subscribedTo'

        setEditProfile(isEdit)
        setFollowingModel(isFollowing)
        setFollowersModel(isFollowers)
        setSubscribersModel(isSubscribers)
        setSubscribedModel(isSubscribed)
    }, [window.location.pathname])

    useEffect(() => {
        setCurrentUser(refUser)
    }, [refUser])

    return (
        <div
            className=' w-[100vw] flex flex-1 flex-col items-center md:pl-[100px] '
        >
            {editUsername && <UsernameEdit toggle={setEditUsername} />}
            {editProfile && <EditProfile toggle={setEditProfile} />}
            {followersModel && <FollowingModel toggle={setFollowersModel} ids={currentUser.Followers} type='followers' />}
            {followingModel && <FollowingModel toggle={setFollowingModel} ids={currentUser.Following} type='following' />}
            {subscribersModel && <FollowingModel toggle={setSubscribersModel} ids={currentUser.subscribers} type='subscribers' />}
            {subscribedModel && <FollowingModel toggle={setSubscribedModel} ids={currentUser.subscribedTo} type='subscribedTo' />}
            <div className=' flex-grow items-center flex-col flex w-full max-w-[1000px]'>

                {/* upper profile details */}
                <div
                    style={{
                        // backgroundColor: theme.secBackground,
                        // border: `1px solid ${theme.lightBorder}`
                    }}
                    className={` ${!currentUser.bio && !currentUser.website && 'md:flex-col'} flex flex-col md:flex-row w-full items-center justify-center py-4 gap-2 md:px-4 md:py-8`}
                >

                    <div className=' flex flex-col gap-4 justify-center items-center '>
                        <img
                            className=' md:h-[150px] h-[100px] md:w-[150px] w-[100px] rounded-full object-cover overflow-hidden'
                            src={currentUser.profileImage ? currentUser.profileImage : userpng}
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
                                        {currentUser.username}
                                        {/* edit */}
                                        {isCurrent && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 -mt-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                                        </svg>}
                                    </h1>
                                    <h1 className=' text-sm text-gray-500'>
                                        {currentUser.name}
                                    </h1>
                                </div>
                                <div>
                                    {!isCurrent && <Button
                                        tailw='px-6 py-[8px]'
                                        text={following ? 'Following' : 'Follow'}
                                        theme={theme}
                                        onClick={Follow}
                                    />}

                                    {!isCurrent && <Button
                                        tailw='px-6 py-[8px]'
                                        text={isSubscribed ? 'Subscribed' : 'Subscribe'}
                                        theme={theme}
                                        onClick={subscribe}
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
                                        Navigate(`/${currentUser.username}/edit`)
                                    }}
                                />
                            </>}
                        </div>
                    </div>
                    <div className=' flex flex-col h-full justify-center gap-4 '>
                        <div className={`flex gap-2 justify-center items-center ${!currentUser.bio && !currentUser.website && isCurrent ? ' flex-row' : 'flex-col '}`
                        }>
                            {currentUser.bio ?
                                <h1
                                    style={{
                                        backgroundColor: theme.secBackground,
                                    }}
                                    className={`text-sm max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl`}
                                >
                                    {currentUser.bio}
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
                            {currentUser.website ?
                                <a
                                    target='_blank'
                                    className=' cursor-pointer text-[12px] hover:underline'
                                    href={currentUser.website}>
                                    {currentUser.website.replace(/(^\w+:|^)\/\//, '')}
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
                                {currentUser.Posts.length} posts
                            </h1> */}
                            <h1
                                onClick={() => {
                                    Navigate(`/${currentUser.username}/followers`)
                                }}

                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {currentUser.Followers.length} followers
                            </h1>
                            <h1
                                onClick={() => {
                                    Navigate(`/${currentUser.username}/following`)
                                }}
                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {currentUser.Following.length} following
                            </h1>
                        </div>
                        <div className='flex justify-center items-center gap-4'>
                            {/* <h1>
                                {currentUser.Posts.length} posts
                            </h1> */}
                            <h1
                                onClick={() => {
                                    Navigate(`/${currentUser.username}/subscribers`)
                                }}

                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {currentUser.subscribers?.length} subscribers
                            </h1>
                            <h1
                                onClick={() => {
                                    Navigate(`/${currentUser.username}/subscribedTo`)
                                }}
                                style={{
                                    backgroundColor: theme.secBackground,
                                }}
                                className=' TouchableBlur rounded-full font-bold px-4 py-2'
                            >
                                {currentUser.subscribedTo?.length} subscribed
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
                    user={currentUser}
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