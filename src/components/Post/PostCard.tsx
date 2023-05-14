import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { like, likeFilled, msg } from '../../assets/Icons'
import { motion } from 'framer-motion'
import { getPostById } from '../../services/Post'
import { sortPostsByTime } from '../../utils/Operations'
import { useNavigate } from 'react-router-dom'

const PostCard = ({
  post,
  isCurrent,
}: any) => {

  const navigate = useNavigate()

  const { theme } = useSelector((state: any) => state)

  return (
    <motion.div

      onClick={() => {
        console.log(post.uid)
        navigate(`/post/${post.uid}`)
      }}
      className='flex flex-col relative justify-center  items-center cursor-pointer rounded-md overflow-hidden  md:rounded-md'
    >

      <img
        className='object-cover h-full md:aspect-square '
        src={post.imageUrls[0]}
        alt={post.imageUrls[0]}
      />
      <div
        style={{
          backgroundColor: theme.blurBackground,
        }}
        className=' duration-100 opacity-0 hover:opacity-100 flex-row hidden md:flex justify-center items-center absolute top-0 bottom-0 right-0 left-0 '
      >
        <h1
          className=' '
        >
          {post.likes.length}
          <img src={likeFilled}
            className={` inline-block w-4 self-center h-4 ml-2 ax  ${theme.mode === 'dark' && 'invert'}`}
            alt="" />
        </h1>
        <h1
          className=' ml-4 '
        >
          {post.comments.length}
          <img src={msg}
            className={` inline-block w-4 h-4 ml-2 self-center  ${theme.mode === 'dark' && 'invert'}`}
          alt="" />
        </h1>
      </div>

    </motion.div>
  )
}

export default PostCard