import React from 'react'
import { useSelector } from 'react-redux'
import FeedMid from './FeedMid'

const Feed = ({ Posts }: any) => {
    const { theme } = useSelector((state: any) => state)

    return (
        <div
            style={{
                color: theme.text,
            }}
            className=' items-center max-md:flex-1  flex flex-col gap-2 '
        >

            <div className=' flex flex-col items-center gap-4 w-full max-md:mb-16 '>
                {Posts && Posts.map((post: any, index: any) => (
                    <FeedMid key={index} Post={post}
                    />
                ))}
            </div>

        </div>
    )
}

export default Feed