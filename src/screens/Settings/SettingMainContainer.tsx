import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import SettingMenu from './SettingMenu'
import SettingView from './SettingView'



const SettingMainContainer = () => {
    const {theme} = useSelector((state: any) => state)
    const [selected, setSelected] = useState('Account')

  return (
    <div
      style={{
        border: `1px solid ${theme.lightBorder}`
      }}
      className='flex flex-row p-8 flex-1 w-full '
    >
      <SettingMenu
      />
      <div>
        <SettingView />
      </div>
    </div>
  )
}

export default SettingMainContainer