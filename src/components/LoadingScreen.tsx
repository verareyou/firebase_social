import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { randomEmoji } from '../utils/Operations'

const LoadingScreen = () => {
  const { theme,Loading } = useSelector((state: any) => state)

  return (
    <div
      style={{
        color: theme.text,
      }}
      className={' Loading-screen top-0 right-0 left-0 bottom-0 fixed flex flex-col justify-center items-center bg-[#f8f8f800] backdrop-blur-sm z-[999999] pointer-events-none opacity-0 ' + (Loading && 'pointer-events-auto opacity-100')}
    >
      <style>
        {`
          .Loading-screen{
              animation: ${Loading ? 'fadeIn' : 'fadeOut'} 0.2s ease-in-out;
          }
        `}
      </style>

      <h1
        className='text-7xl symbol font-bold '
      >
        {randomEmoji()}
      </h1>
    </div>
  )
}

export default LoadingScreen