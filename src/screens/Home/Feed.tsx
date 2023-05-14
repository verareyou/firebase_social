import React from 'react'
import { useSelector } from 'react-redux'
import FeedCard from './FeedCard'

const Feed = ({ Posts }: any) => {
    const { theme } = useSelector((state: any) => state)

    return (
        <div
            style={{
                color: theme.text,
            }}
            className=' flex-1 min-h-screen w-screen items-center flex flex-col gap-2 p-4 '
        >

            <div className=' flex flex-col items-center gap-4 w-full '>
                {Posts && Posts.map((post: any, index: any) => (
                    <FeedCard key={index} post_Id={post} />
                ))}
            </div>

        </div>
    )
}

export default Feed