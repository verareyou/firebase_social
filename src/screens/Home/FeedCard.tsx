import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dotmenu, like, likeFilled, msg } from '../../assets/Icons'
import { useNavigate } from 'react-router-dom'

const FeedCard = ({ post }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [liked, setLiked] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {

        const isLiked = post.likes.find((like: any) => like.user_id === user.uid)
        if (isLiked) {
            setLiked(true)
        } else {
            setLiked(false)
        }

    }, [post.likes])

    return (
        <div
            style={{
                color: theme.text,
            }}
            className='flex flex-col flex-grow gap-2 max-w-[600px]'
        >
            <div
                style={{
                    backgroundColor: theme.secBackground,
                }}
                className='flex flex-row items-center rounded-full justify-between w-full h-[52px] px-2'
            >
                <div
                    onClick={() => navigate(`/${post.username}`)}
                    className='flex flex-row items-center gap-1 TouchableBlur'
                >
                    <img
                        src={post.user.profileImage}
                        alt=""
                        className='w-10 h-10 rounded-full object-cover'
                    />

                    <h1
                        className='ml-2 font-semibold'
                    >
                        {post.username}
                    </h1>
                </div>
                <div
                    className=' TouchableBlur pr-2'
                    onClick={() => console.log('clicked')}
                >
                    <img
                        style={{
                            filter: theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'
                        }}
                        src={dotmenu}
                        alt=""
                        className='w-6 h-6 '
                    />
                </div>
            </div>

            <div
                className='flex flex-col items-center justify-center w-full max-h-[500px] overflow-hidden rounded-2xl '
            >
                <img
                    src={post.imageUrls[0]}
                    alt=""
                    className='w-full h-full object-cover rounded-md'
                />
            </div>

            <div
                style={{
                    backgroundColor: theme.secBackground,
                }}
                className='flex flex-row  items-center rounded-full justify-between w-full h-[52px] px-2'
            >
                <div
                    className='flex flex-row items-center gap-4 pl-2'
                >
                    <img
                        src={liked ? likeFilled : like}
                        alt=""
                        className={`w-6 h-6 TouchableBlur ${theme.mode === 'dark' && 'invert'}`}
                    />
                    <img
                        src={msg}
                        alt=""
                        className={`w-6 h-6 TouchableBlur ${theme.mode === 'dark' && 'invert'}`}
                    />
                </div>
            </div>

            <div
                style={{
                    backgroundColor: theme.lightText,
                }}
                className=' opacity-30 rounded-full mb-2 w-full md:h-[2px] h-[3px]'
            />
        </div>
    )
}

export default FeedCard