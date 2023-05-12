import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../services/User'
import { UserProps } from '../models/UserModel'

const ProfileView = ({ username, visible, setVisible }: any) => {
    const { theme,user } = useSelector((state: any) => state)
    const [close, setClose] = useState<boolean>(false)
    const [displayUser, setDisplayUser] = useState<any>({}) as [UserProps, any]
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)

    const fetchUser = async () => {
        setLoading(true)
        const res = await getUserByUsername(username)
        setDisplayUser(res)
        setLoading(false)
    }
    useEffect(() => {
        fetchUser()
    }, [])


    return (
        loading ? <div></div> :
        <div
            onMouseOver={() => { setVisible({ ...visible, visible: true }) }}
            onMouseLeave={() => { 
                setClose(true)
                setTimeout(() => {

                setVisible({...visible, visible: false})
                setClose(false)
                }, 100);
            }}
            style={{
                backgroundColor: theme.insecBackground,
                color: theme.text,
                top: visible.pos.y,
                left: visible.pos.x,
                display: visible.visible ? 'flex' : 'none'

            }}
            className={` profileview flex-col p-4 h-[250px] gap-4 w-[350px] overflow-hidden md:flex hidden rounded-xl fixed `}
        >
            <style>
                {`
                .profileview {
                    animation: ${visible.visible && !close ? 'fadeIn' : 'fadeOut'} 0.1s ease-in-out;
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
                        tailw='px-0 py-0'
                        style={{
                            fontWeight: 'bold',
                            border: 'none'
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
                        text='Follow'
                        tailw=' w-full px-2 py-1'
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
        </div>
    )
}

export default ProfileView