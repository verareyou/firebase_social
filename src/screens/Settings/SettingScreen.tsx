import React from 'react'
import { useSelector } from 'react-redux'
import SettingMainContainer from './SettingMainContainer'

const SettingScreen = () => {
    const { theme } = useSelector((state: any) => state)


  return (
    <div
        style={{
            backgroundColor: theme.background,
            color: theme.text,
        }}
        className='flex flex-col items-center justify-center pl-[100px] h-screen w-screen'
    >
      <SettingMainContainer />
      
    </div>
  )
}

export default SettingScreen