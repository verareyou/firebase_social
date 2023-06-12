import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import EditField from '../EditField'
import { updateUserByField } from '../../services/UserMutations'
import { isSameUsername } from '../../services/Validations'
import { setProfileListener } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const UsernameEdit = ({ toggle }: any) => {
    const { user, theme } = useSelector((state: any) => state)
    const [username, setUsername] = useState<string>(user.username)
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUsernameChange = async () => {
        try {
            const res = await updateUserByField(user, 'username', username)
            console.log(res)
            dispatch(setProfileListener())
            navigate(`/${username}`)
            toggle(false)
        }
        catch (err) {
            console.log(err)
        }
    }



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
                <EditField
                    value={username}
                    style={{
                        backgroundColor: theme.background,
                    }}
                    onChange={async (e: any) => {
                        setUsername(e.target.value)
                        const res = await isSameUsername(e.target.value)
                        setUsernameTaken(res)
                    }}
                    type="text"
                    placeholder='Username'
                />
                <p
                    className={' text-red-500 text-[12px] -mt-3 ml-4 duration-400 ' + (username === user.username ? 'text-[#47ff44]' : '') + (usernameTaken ? 'text-red-500' : 'text-[#47ff44] ')}
                >
                    {username === user.username ? 'you are using it' : usernameTaken ? 'already taken' : 'available'}
                </p>
                <div className=' flex gap-4'>
                    <Button
                        text='Cancel'
                        onClick={() => toggle(false)}
                        theme={theme}
                    />
                    <Button
                        disabled={username === user.username || usernameTaken}
                        text='Save'
                        // type='submit'
                        onClick={handleUsernameChange}
                        tailw=' bg-blue-500 text-black '
                        theme={theme}
                    />
                </div>
            </div>

        </div>
    )
}

export default UsernameEdit