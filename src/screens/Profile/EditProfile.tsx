import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditField from '../../components/EditField'
import { isSameUsername } from '../../services/Validations'
import { Button, LoadingScreen } from '../../components'
import { updateProfile } from '../../services/User'
import { SetUser, setLoading } from '../../redux/userSlice'

const EditProfile = ({ toggle }: any) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { theme, user } = useSelector((state: any) => state)

    const [image, setImage] = useState<File>(null as any)
    const [name, setName] = useState<string>(user.name)
    const [bio, setBio] = useState<string>(user.bio)
    const [website, setWebsite] = useState<string>(user.website)
    const [username, setUsername] = useState<string>(user.username)
    const [usernameTaken, setUsernameTaken] = useState<boolean>(false)
    const [close, setClose] = useState<boolean>(false)

    const handleUpdateProfile = async () => {
        dispatch(setLoading(true))
        const res = await updateProfile({
            name,
            username,
            bio,
            website,
            image,
        }, user)

        if (res) {
            dispatch(setLoading(false))

            setClose(true)
            setTimeout(() => {
                toggle(false)

                // console.log(res.username)
                // console.log(user.username)
                dispatch(SetUser(res))
                navigate(`/${res.username}`)
            }, 200);
        } else {
            dispatch(setLoading(false))
        }
    }

    return (
        <div
            // onClick={handleEdit}

            className={` EditProfileForm fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#f8f8f800] backdrop-blur-[5px] z-[9999]`}
        >
            <style>
                {`
                .EditProfileForm{
                    animation: ${close ? 'fadeOut' : 'fadeIn'} 0.3s ease-in-out;
                }
                `}
            </style>
            <style>
                {`
                // .imageInput::-webkit-file-upload-button {
                //     visibility: hidden;
                // }

                `}
            </style>
            <div
                style={{
                    backgroundColor: theme.secBackground,
                    color: theme.text
                }}
                className=' EditUsername flex flex-col gap-4 p-8 sm:max-w-fit rounded-3xl z-[9999]'
            >
                <h1 className=' text-center text-[18px] font-semibold'>
                    Edit Profile
                </h1>
                <div
                    className=' flex flex-col gap-4'
                >

                    {/* image change */}

                    <div
                        className=' flex flex-col md:flex-row items-center gap-4'
                    >
                        <div
                            className=' w-[60px] h-[60px] flex  justify-center items-center rounded-full overflow-hidden'
                        >
                            <img
                                className=''
                                src={image ? URL.createObjectURL(image) : user.profileImage}
                                alt=""
                            />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            placeholder='Profile Image'
                            className={' file:border-none box file:text-sm font-light file:font-bold text-sm file:text-[#ffffff] file:bg-black file:rounded-full file:px-4 file:py-2 file:cursor-pointer file:mr-6 flex-shrink ' + (theme.mode === 'dark' && 'file:invert')}
                            onChange={(e) => {
                                e.target.files && setImage(e.target.files[0])
                            }}
                        />
                    </div>
                    <div
                        className=' flex flex-col gap-2'
                    >
                        <EditField

                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                        <EditField

                            style={{
                                border: usernameTaken ? '1px solid red' : `1px solid ${theme.lightBorder}`
                            }}
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={async (e: any) => {
                                setUsername(e.target.value)
                                const res = await isSameUsername(e.target.value)
                                if (e.target.value === user.username) {
                                    setUsernameTaken(false)
                                    return
                                }
                                setUsernameTaken(res && true)
                            }}

                        />
                        <EditField

                            textArea
                            // type='text'
                            placeholder='Bio'
                            value={bio}
                            onChange={(e: any) => setBio(e.target.value)}
                            tailw='h-[150px]'
                        />
                        <EditField
                            type='url'
                            placeholder='Website'
                            value={website}
                            onChange={(e: any) => setWebsite(e.target.value)}
                        />

                        <div
                            className=' flex justify-center items-center gap-4'
                        >
                            <Button
                                onClick={() => {

                                    setClose(true)
                                    setTimeout(() => {
                                        toggle(false)
                                        navigate(`/${user.username}`)
                                    }, 200);
                                }}
                                text='Cancel'
                                theme={theme}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: theme.text
                                }}
                            // tailw='w'
                            />
                            <Button
                                disabled={usernameTaken ? true : false}
                                onClick={handleUpdateProfile}
                                text='Save'
                                theme={theme}
                                style={{
                                    backgroundColor: theme.text,
                                    color: theme.background
                                }}
                                tailw='w-full'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile