import React from 'react'
import { useSelector } from 'react-redux'

const PostScreen = () => {

  const { theme } = useSelector((state: any) => state)

  return (
    <div
      style={{
        color: theme.text,
      }}
      className=' flex-1 min-h-screen w-screen items-center flex flex-col gap-2 p-4 '
    >
      

    </div>
  )
}

export default PostScreen