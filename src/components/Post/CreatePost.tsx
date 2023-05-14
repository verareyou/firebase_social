import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditField from '../EditField'
import { Button } from '..'
import { SetUser, setLoading } from '../../redux/Slice'
import { createPost } from '../../services/Post'
import { randomEmoji } from '../../utils/Operations'

const CreatePost = ({ toggle, setRoute }: any) => {
    const dispatch = useDispatch()
    const { theme, user } = useSelector((state: any) => state)

    const [image, setImage] = useState<File>(null as any)
    const [caption, setCaption] = useState<string>('')
    const [close, setClose] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const handleCreatePost = async () => {
        dispatch(setLoading(true))

        if (!image) {
            dispatch(setLoading(false))
            setClose(false)
            setError('Please select an image')
            setTimeout(() => {
            toggle(false)
            }, 1000);
            return
        }

        const res = await createPost({ image, caption, user })
        console.log(res)
        if (res) {
            dispatch(SetUser(res))
            dispatch(setLoading(false))
            setClose(true)
            setTimeout(() => {
                toggle(false)
                // navigate(`/${user.username}`)
            }, 200);
        }
    }

    return (
        <div
            className={` CreatePostForm fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#f8f8f800] backdrop-blur-[2px] z-[9999]`}
        >
            {error && <div
                className=' fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#f8f8f822] backdrop-blur-[2px] z-[9999]'
            >
                <div>

                </div>
                <div
                    onClick={() => {
                        setError('')
                        setClose(true)
                        setTimeout(() => {
                            toggle(false)
                            // navigate(`/`)
                        }, 200);
                    }}
                    className=' text-4xl font-bold flex flex-col items-center '
                >
                    <h1>
                    {randomEmoji()}
                    </h1>
                    {error}
                </div>

            </div>}
            <style>
                {`
                .CreatePostForm{
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
                className=' EditUsername flex flex-col gap-4 p-8 sm:max-w-fit rounded-3xl shadow-lg z-[999]'
            >
                <h1 className=' text-center text-[18px] font-semibold'>
                    Create Post
                </h1>
                <div
                    className=' flex flex-col gap-4'
                >

                    <div
                        className=' flex flex-col items-center gap-2'
                    >
                        <div
                            className=' max-h-[250px] max-w-[250px] flex justify-center items-center rounded-xl mb-2 overflow-hidden'
                        >

                            {image ?
                                <img
                                    // gallery demo photo
                                    className=''
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                /> :
                                <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6" color={theme.text} fill={theme.text} height="120" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            }
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            placeholder='Profile Image'
                            className={' file:border-none TouchableBlur box file:text-sm font-light file:font-bold text-sm file:text-[#ffffff] file:bg-black file:rounded-full file:px-4 file:py-2 file:cursor-pointer file:mr-6 flex-shrink ' + (theme.mode === 'dark' && 'file:invert')}
                            onChange={(e) => {
                                e.target.files && setImage(e.target.files[0])
                            }}
                        />
                    </div>
                    <div
                        className=' flex flex-col gap-2'
                    >
                        <EditField
                            textArea
                            placeholder='Caption'
                            tailw='h-[100px]'
                            value={caption}
                            onChange={(e: any) => setCaption(e.target.value)}
                        />

                        <div
                            className=' flex justify-center items-center gap-4'
                        >
                            <Button
                                onClick={() => {

                                    setClose(true)
                                    setTimeout(() => {
                                        toggle(false)
                                        setRoute('home')
                                        // navigate(`/`)
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
                                onClick={() => handleCreatePost()}
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

export default CreatePost