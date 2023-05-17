import React, { useEffect, useState } from 'react'
import { getUserByUid } from '../../services/User'
import { sortPostsByTime } from '../../utils/Operations'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const CommentList = ({ post }: any) => {
    const { theme } = useSelector((state: any) => state)
    return (
        <div
            className='flex flex-col pb-2 gap-2'
        >
            {sortPostsByTime(post).map((comment: any, index: any) => (
                <Listed
                    theme={theme}
                    key={index}
                    comment={comment}
                />
            ))}
        </div>
    )
}

const Listed = ({ comment, theme }: any) => {
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserByUid(comment.uid)

            if (res) {
                setUser(res)
            }
        }
        fetchUser()
    }, [])

    return (
        <div
            style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #333333'
            }}
            className='flex flex-row items-center rounded-3xl gap-2 p-1'
        >
            <img
                onClick={() => navigate(`/${user.username}`)}
                src={user && user.profileImage}
                alt="profile"
                className='w-8 h-8 rounded-full object-cover'
            />
            <div
                className='flex flex-col gap-[1px]'
            >
                <div
                    className='flex flex-row gap-2'
                >

                    <h1
                onClick={() => navigate(`/${user.username}`)}
                        className='text-sm font-semibold'
                    >
                        {user && user.username}
                    </h1>
                    <h1
                        className='text-sm font-light '
                    >
                        {comment.comment.slice(0, 25)}
                    </h1>
                </div>
                <h1
                    className={'text-sm' + (comment.comment.length > 25 ? '' : 'hidden')}
                >
                    {comment.comment.slice(25, 50)}
                </h1>
            </div>
        </div>
    )
}


export default CommentList