import React from 'react'
import { like, likeFilled, msg } from '../../assets/Icons'
import { useSelector } from 'react-redux'

const CommentCard = ({liked, onLike, onComment,post, showPost}: any) => {
    const { theme } = useSelector((state: any) => state)
  return (
    <div
                style={{
                    backgroundColor: theme.mode === 'dark' ? '#1f1f1f55' : '#f8f8f833',
                }}
                className='flex flex-row  backdrop-blur-[2px] mx-2 mb-2 gap-4items-center rounded-3xl justify-center items-center gap-4 min-h-[54px] px-2'
            >
                <div
                    className='flex flex-row items-center gap-4 pl-2'
                >
                    <div
                        className=' flex items-center gap-1'
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
                            src={msg}
                            alt=""
                            className={`w-6 h-6 hover:blur-[1px] duration-150 blur-0 cursor-pointer invert`}
                        />
                    </div>
                </div>

                <div
                    className=' TouchableBlur text-left flex flex-1'
                >
                    <h1
                        className=' text-[#bebebe] text-xs whitespace-pre-line max-w-[200px]'
                    >
                        {showPost && post.caption}
                    </h1>
                </div>
            </div>
  )
}

export default CommentCard