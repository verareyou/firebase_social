import React, { useEffect, useState } from 'react'
import { like, likeFilled, msg } from '../../assets/Icons'
import { useSelector } from 'react-redux'

const CommentCard = ({ liked, onLike, onComment, post, showPost, fullCaption, setFullCaption, setOpenComment, openComment }: any) => {
    const { theme } = useSelector((state: any) => state)

    // useEffect(() => {
    //     if(!post.caption) return setFullCaption('')
    //     if(post.caption.length > 30) {
    //         setFullCaption(post.caption.slice(0, 30)+'...')
    //     } else {
    //         setFullCaption(post.caption)
    //     }
    // }, [])


    // const showCaption = () => {
    //     if(fullCaption.length > 33) {
    //         console.log('...')
    //         setFullCaption(post.caption.slice(0, 30)+'...')
    //     } else {
    //         setFullCaption(post.caption)
    //     }
    // }d

    return (
        <div
            style={{
                backgroundColor: theme.mode === 'dark' ? '#1f1f1faa' : '#111111aa',
            }}
            className='flex flex-row backdrop-blur-[2px] mb-2 rounded-3xl justify-center items-center gap-4 px-1'
        >
            <div
                className='flex flex-row items-center gap-4 pl-2 h-[44px] '
            >
                <div
                    className=' flex items-center gap-2'
                >
                    <h1
                        className=' text-[#bebebe] text-xs'
                    >
                        {showPost && post.likes.length}
                    </h1>
                    <img
                        onClick={onLike}
                        src={liked ? likeFilled : like}
                        alt=""
                        className={`w-6 h-6 hover:blur-[1px] duration-150 blur-0 cursor-pointer invert`}
                    />
                </div>

                <div>
                    <img
                        onClick={onComment}
                        src={msg}
                        alt=""
                        className={`w-6 h-6 hover:blur-[1px] duration-150 blur-0 cursor-pointer invert`}
                    />
                </div>
            </div>

            <div
                onClick={() => {
                    setOpenComment(!openComment ? true : (fullCaption ? false : true))
                    setFullCaption(!openComment ? true : (fullCaption && openComment ? false : true))
                }}
                className=' TouchableBlur text-left flex flex-1'
            >
                <h1
                    className=' text-[#fff] duration-200 text-xs py-2 pr-4 whitespace-pre-line max-w-[200px]'
                >
                    {showPost && post.caption && (fullCaption ? post.caption :
                        post.caption.length > 30 ? post.caption.slice(0, 30) + '...' : post.caption
                    )}
                </h1>
            </div>
        </div>
    )
}

export default CommentCard