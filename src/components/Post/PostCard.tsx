import React from 'react'
import { useSelector } from 'react-redux'
import { like, likeFilled } from '../../assets/Icons'

const PostCard = ({
  post,
  isCurrent,
}: any) => {

  const { theme } = useSelector((state: any) => state)

  return (
    <div
      onClick={() => {
        
      }}
      className='flex flex-col relative justify-center items-center cursor-pointer rounded-sm overflow-hidden md:max-h-[300px] md:rounded-none'
    >

      <img
        className='object-cover '
        src={post.imageUrls[0]}
        alt={post.imageUrls[0]}
      />
      <div
        style={{
          backgroundColor: theme.blurBackground,
        }}
        className=' duration-300 flex-col hidden md:flex justify-center items-center absolute backdrop-blur-[2px] opacity-0 hover:opacity-100 top-0 bottom-0 right-0 left-0 '
      >
        <h1
          className=' text-lg flex justify-center font-semibold max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl'
        >
          {post.likes.length}
          <img src={likeFilled}
            className={` inline-block w-6 h-6 TouchableBlur ml-2  ${theme.mode === 'dark' && 'invert'}`}
          alt="" />
        </h1>
        <h1
          className=' text-sm font-bold max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl'
        >
          {post.likes.length} likes
        </h1>
      </div>

    </div>
  )
}

export default PostCard