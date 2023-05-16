import React from 'react'
import FeedCard from '../Home/FeedCard'
import FeedMid from '../Home/FeedMid'

const PostScreenCard = ({ post }: any) => {
    


    return (
        <div className='flex flex-1 w-full flex-col items-center gap-2'>
            <div
                className=' flex-row md:flex hidden items-center gap-2'
            >
                <div>
                    <img
                        src={post.imageUrls[0]}
                        alt='post image'
                        className='w-full max-h-[600px] max-w-[600px] rounded-md'
                    />
                </div>
                <div
                    className='flex flex-col outline w-[] gap-2'
                >
                    <div
                        className='flex flex-row items-center gap-2'
                    >
                        <img
                            src={post.user.profileImage}
                            alt='profile image'
                            className='w-10 h-10 object-cover rounded-full'
                        />

                        <div
                            className='flex flex-col gap-1'
                        >
                            <div
                                className='flex flex-row items-center gap-2'
                            >
                                <div
                                    className='font-semibold'
                                >
                                    {post.user.username}
                                </div>
                                <div
                                    className='text-gray-500'
                                >
                                    {post.user.name}
                                </div>
                                <div
                                    className='text-gray-500'
                                >
                                    {post.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div
                className='flex w-full items-center flex-1 flex-col md:hidden gap-2'
            >
                <FeedMid
                    post_Id={{ id: post.uid, ...post }}
                    Post={post}
                />

            </div>
        </div>
    )
}

export default PostScreenCard