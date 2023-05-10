import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LoadingScreen = ({ loading, icon }: any) => {
  const { theme } = useSelector((state: any) => state)

  useEffect(() => {
    const loadingScreen = document.querySelector('.loading-screen')
    if (loading) {
      loadingScreen?.classList.remove('hidden')
      loadingScreen?.classList.add('flex')
      loadingScreen?.classList.remove('duration-100')
      loadingScreen?.classList.remove('opacity-0')
      loadingScreen?.classList.add('opacity-100')
    } else {
      loadingScreen?.classList.remove('opacity-100')
      loadingScreen?.classList.add('duration-100')
      loadingScreen?.classList.add('opacity-0')

      setTimeout(() => {
        loadingScreen?.classList.remove('flex')
        loadingScreen?.classList.add('hidden')
      }, 500)

    }
  }, [loading])

  return (
    <div
      style={{
        color: theme.text,
      }}

      className={' loading-screen top-0 right-0 left-0 bottom-0 fixed flex-col no hidden justify-center items-center bg-[#f8f8f800] backdrop-blur-[30px] z-[9999] opacity-0 '}
    >

      

      <h1
        className='text-7xl symbol font-bold '
      >
        {icon || '💩'}
      </h1>
    </div>
  )
}

export default LoadingScreen