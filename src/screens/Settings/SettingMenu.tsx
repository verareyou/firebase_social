import React from 'react'
import { useSelector } from 'react-redux'


const Items =({title, selected, onClick}: any) => {
    
    return (
        <div
            className='select-none flex flex-row items-center justify-between p-4 rounded-[30px] cursor-pointer'
        >
            
        </div>
    )
}

const SettingMenu = () => {
    const {theme} = useSelector((state: any) => state)
  return (
    <div
    style={{
        backgroundColor: theme.background,
        color: theme.text,
    }}
    className='flex flex-col rounded-[30px] h-full w-1/4 mr-8 '
    >
      <div>
        
      </div>
    </div>
  )
}

export default SettingMenu