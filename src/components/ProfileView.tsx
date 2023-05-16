import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../services/User'
import { UserProps } from '../models/UserModel'
import { SetUser } from '../redux/Slice'
import { FollowUser } from '../services/Mutations'

const ProfileView = ({ username, ref, setVisible, visible, showPost }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [close, setClose] = useState<boolean>(false)
    const [displayUser, setDisplayUser] = useState<any>({}) as [UserProps, any]
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [following, setFollowing] = useState<boolean>(false)
    const dispatch = useDispatch()


    const fetchUser = async () => {
        setLoading(true)
        const res = await getUserByUsername(username)
        if (!res) {
            setLoading(false)
            return
        }
        res!.uid === user.uid ? setIsCurrentUser(true) : setIsCurrentUser(false)
        const isFollowing = res.Followers!.find((followingUser: any) => followingUser === user.uid)
        const isFollowing2 = user.Following!.find((followingUser: any) => followingUser === res.uid)
        if (isFollowing && isFollowing2) {
            setFollowing(true)
        } else {
            setFollowing(false)
        }
        setDisplayUser(res)
        setLoading(false)
    }
    useEffect(() => {
        fetchUser()
    }, [following])

    useEffect(() => {
        if (visible.visible) {
            setTimeout(() => {
                setClose(false)
            }, 100)
        } else {
            setTimeout(() => {
                setClose(true)
            }, 100)
        }
    }, [visible])

    const Follow = async () => {
        setLoading(true)
        const res = await FollowUser(user, displayUser)
        console.log(res)
        if (!res) {
            setLoading(false)
            return
        }
        dispatch(SetUser(res.updatedUser))
        setLoading(false)
        setFollowing(!following)
    }

    return (
        showPost && loading ? <div></div> :
            <div
                // ref={ref}
                onMouseEnter={() => { setVisible({ ...visible, visible: true }) }}
                onMouseLeave={() => {
                    setVisible({ ...visible, visible: false })
                }}
                style={{
                    backgroundColor: '#111111dd',
                    color: theme.text,
                    // top: visible.pos.y,
                    // left: visible.pos.x,
                    opacity: visible.visible ? 1 : 0,
                    display: !close ? 'flex' : 'none',

                }}
                className={` profileview absolute top-10 duration-200 backdrop-blur-[2px] flex-col p-4 flex h-[250px] gap-4 w-[350px] overflow-y-auto scrollbar-none rounded-xl z-[9999] `}
            >
                <style>
                    {`
                .profileview {
                    // animation: ${visible.visible ? 'fadeIn' : 'fadeOut'} 0.1s ease-in-out;

                }
                `}
                </style>
                <div
                    className=' flex items-center w-full gap-4'
                >
                    <img
                        className='object-cover overflow-hidden rounded-full w-[60px] h-[60px] '
                        src={displayUser.profileImage}
                        alt="profile" />

                    <div
                        className=' flex flex-col '
                    >
                        <Button
                            theme={theme}
                            text={displayUser.username}
                            onClick={() => {
                                navigate(`/${displayUser.username}`)
                            }}
                            // tailw='px-0 py-0'
                            style={{
                                fontWeight: 'bold',
                                border: 'none',
                                padding: '0px',
                            }}
                        />
                        <h1 className=' text-[12px] font-normal'>
                            {displayUser.name}
                        </h1>

                    </div>

                    <div
                        className=' flex flex-col gap-1 ml-auto'
                    >
                        <Button
                            theme={theme}
                            text='Message'

                            tailw=' w-full hidden px-1 py-1'
                            style={{
                                fontSize: '12px'
                            }}
                        />

                        <Button
                            theme={theme}
                            onClick={Follow}
                            text={following ? 'Following' : 'Follow'}
                            tailw={' w-full px-2 py-1' + (isCurrentUser ? ' hidden' : '')}
                            style={{
                                fontSize: '12px'
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <h1
                        style={{
                            // backgroundColor: theme.secBackground,
                            border: `1px solid ${theme.lightBorder}`,
                            fontSize: '12px'
                        }}
                        className='  TouchableBlur rounded-full px-4 py-2'
                    >
                        {displayUser.Posts.length} posts
                    </h1>
                    <h1
                        style={{
                            // backgroundColor: theme.secBackground,
                            border: `1px solid ${theme.lightBorder}`,
                            fontSize: '12px'
                        }}
                        className=' rounded-full px-4 py-2'
                    >
                        {displayUser.Followers.length} followers
                    </h1>
                    <h1
                        style={{
                            // backgroundColor: theme.secBackground,
                            border: `1px solid ${theme.lightBorder}`,
                            fontSize: '12px'
                        }}
                        className='  rounded-full px-4 py-2'
                    >
                        {displayUser.Following.length} following
                    </h1>
                </div>
                <div
                    className=' flex flex-row flex-wrap gap-2 mt-2'

                >
                    {
                        displayUser.Posts.map((post: any, index: any) => (
                            <img
                                key={index}
                                className='object-cover w-[100px] h-[100px] rounded-md'
                                src={post.imageUrls[0]}
                                alt="post"
                            />
                        ))
                    }
                </div>
            </div>
    )
}

export default ProfileView