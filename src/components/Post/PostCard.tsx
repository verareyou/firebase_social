import React from 'react'
import { useSelector } from 'react-redux'
import { like, likeFilled, msg } from '../../assets/Icons'
import { motion } from 'framer-motion'

const PostCard = ({
  post,
  isCurrent,
}: any) => {

  const { theme } = useSelector((state: any) => state)

  return (
    <motion.div
      
      onClick={() => {
        
      }}
      className='flex flex-col relative justify-center  items-center cursor-pointer rounded-md overflow-hidden md:h-[300px] md:w-full md:rounded-md'
    >

      <img
        className='object-cover h-full w-full '
        src={post.imageUrls[0]}
        alt={post.imageUrls[0]}
      />
      <motion.div
        initial={{
          opacity: 0,
          borderRadius: '10px',
        }}
        whileHover={{
          scale: 1.1,
          opacity: 1,
          borderRadius: '10px',
          transition: {
            duration: 0.1,
            ease: 'easeIn',
          },
        }}
        style={{
          backgroundColor: theme.blurBackground,
        }}
        className=' duration-300 flex-row hidden md:flex opacity-100 justify-center items-center absolute top-0 bottom-0 right-0 left-0 '
      >
        <h1
          className=' text-lg flex justify-center font-semibold max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl'
        >
          {post.likes.length}
          <img src={likeFilled}
            className={` inline-block w-6 h-6 ml-2  ${theme.mode === 'dark' && 'invert'}`}
          alt="" />
        </h1>
        <h1
          className=' text-lg flex justify-center font-semibold max-w-[300px] text-center p-4 whitespace-pre-line rounded-3xl'
        >
          {post.comments.length}
          <img src={msg}
            className={` inline-block w-6 h-6 ml-2  ${theme.mode === 'dark' && 'invert'}`}
          alt="" />
        </h1>
      </motion.div>

    </motion.div>
  )
}

export default PostCard