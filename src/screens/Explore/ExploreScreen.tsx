import React from 'react'
import ExplorePosts from './ExplorePosts'
import { useSelector } from 'react-redux'

const ExploreScreen = () => {
  const { theme } = useSelector((state: any) => state)
  return (
    <div
    style={{
      color: theme.text,
      backgroundColor: theme.background
    }}
      className='flex flex-col min-h-screen items-center justify-center'
    >
      <div
      className=' flex-grow items-center flex-col md:pl-32 flex max-w-[1000px]'
      >
        <ExplorePosts />
      </div>
    </div>
  )
}

export default ExploreScreen