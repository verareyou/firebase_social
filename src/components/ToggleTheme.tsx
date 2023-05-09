import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetTheme } from '../redux/Slice'

const ToggleTheme = () => {

    const { theme } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    const toggleTheme = () => {
        dispatch(SetTheme())
    }

    return (
        <div
            className='fixed bottom-4 right-4'
            onClick={toggleTheme}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer "
                fill="none"
                viewBox="0 0 24 24"
                stroke={theme.text}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={5}
                    d={theme.dark ? "M12 6a9 9 0 100 18 9 9 0 000-18z" : "M12 6a9 9 0 019 9 9 9 0 11-18 0 9 9 0 019-9z"}
                />
            </svg>

        </div>
    )
}

export default ToggleTheme