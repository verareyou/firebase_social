import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import EditField from '../EditField'

const UsernameEdit = ({toggle}) => {
    const { user, theme } = useSelector((state: any) => state)
    const [username, setUsername] = useState<string>(user.username)

    // const handleUsernameChange = (e: any) => {
    //     setUsername(e.target.value)
    // }



    return (
        <div
            className={` fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#f8f8f800] backdrop-blur-[5px] z-[9999]`}
        >

            <style>
                {`
                    .EditUsername{
                        animation: fadeIn 0.1s ease-in-out;
                    }
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                            scale: 1.1;
                        }
                        100% {
                            opacity: 1;
                            scale: 1;
                        }
                    }
                `}
            </style>

            <div
                style={{
                    backgroundColor: theme.secBackground,
                    color: theme.text
                }}
                className=' EditUsername flex flex-col gap-4 p-4 rounded-md'
            >
                <h1
                    className=' font-bold text-xl'
                >
                    Change Username
                </h1>
                {username}
                <EditField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder='Username'
                />
                <div className=' flex gap-4'>
                    <Button
                        text='Cancel'
                        onClick={() => toggle(false)}
                        theme={theme}
                    />
                    <Button
                        text='Save'
                        isBlue
                        theme={theme}
                    />
                </div>
            </div>

        </div>
    )
}

export default UsernameEdit