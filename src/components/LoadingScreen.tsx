import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LoadingScreen = ({ loading, icon }: any) => {
  const { theme } = useSelector((state: any) => state)

  return (
    <div
      style={{
        color: theme.text,
      }}
      className={' loading-screen top-0 right-0 left-0 bottom-0 fixed flex flex-col justify-center items-center bg-[#f8f8f800] backdrop-blur-[10px] z-[9999] pointer-events-none opacity-0 ' + (loading && 'pointer-events-auto opacity-100')}
    >
      <style>
        {`
          .loading-screen{
              animation: ${loading ? 'fadeIn' : 'fadeOut'} 0.3s ease-in-out;
          }
        `}
      </style>

      <h1
        className='text-7xl symbol font-bold '
      >
        {icon ? icon : '💩'}
      </h1>
    </div>
  )
}

export default LoadingScreen