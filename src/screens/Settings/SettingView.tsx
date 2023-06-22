import React from 'react'
import { useSelector } from 'react-redux'

const SettingView = () => {

    const { theme } = useSelector((state: any) => state)

  return (
    <div
        className='flex flex-col items-center justify-center h-full w-full '
        style={{

        }}
    >
        
    </div>
  )
}

export default SettingView