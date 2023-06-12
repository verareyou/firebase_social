import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetTheme } from '../redux/userSlice'
import { lightMode, darkMode } from '../assets/Icons'

const ToggleTheme = () => {

    const { theme } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    const toggleTheme = () => {
        dispatch(SetTheme())
    }

    return (
        <div
            className='cursor-pointer'
            onClick={toggleTheme}
        >
            <img
                src={theme.mode === 'dark' ? lightMode : darkMode}
                alt="theme"
                className={`${theme.mode === 'dark' ? 'h-6' : 'h-5'}`}
                style={{
                    filter: `invert(${theme.mode === 'dark' ? 1 : 0})`
                }}
            />

        </div>
    )
}

export default ToggleTheme