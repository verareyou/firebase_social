import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import EditField from '../EditField'
import { useNavigate } from 'react-router-dom'


const FeedMenu = ({
    user,
    Follow,
    isCurrentUser,
    visible,
    setVisible,
    deletePost,
    post,
    following,
    setEditCaption: edit
}: any) => {

    const { theme } = useSelector((state: any) => state)
    const navigate = useNavigate()
    // const [visible2, setVisible2] = useState<boolean>(false)
    const [editt, setEditt] = useState<boolean>(false)
    const [editCaption, setEditCaption] = useState(post.caption)

    // useEffect(() => {
    //     visible ? setVisible2(true) : setVisible2(false)
    // }, [visible])

    const handleEdit = async () => {
        await edit(editCaption)
    }

    return (
        <div
            style={{
                color: theme.text,
                backgroundColor: '#181818aa',
                height: editt ? '108px' : !isCurrentUser ? '56px' : '150px',
                transition: 'height 0.2s ease-in-out'
            }}
            className=" PostMenu flex flex-row duration-200 w-fit justify-center p-2 rounded-3xl backdrop-blur-[2px] gap-2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[99] "
        >
            {/* <style>
                {`
                .PostMenu {
                    animation: fadeIn 0.1s ease-in-out;
                    ${!visible && ' animation:  0.1s ease-in-out;'}
                }
            `}
            </style> */}
            <div
                className='flex flex-col gap-2 relative justify-center items-center overflow-hidden'
            >
                <div
                    style={{
                        transform: !editt ? 'translateX(0)' : 'translateX(-100%)',
                        opacity: !editt ? '1' : '0',
                        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out'
                    }}
                    className='flex flex-col h-full w-full absolute justify-center gap-2'
                >
                    {isCurrentUser &&
                        <>
                            <Button
                                stayLight
                                theme={theme}
                                text='Edit'
                                onClick={() => {
                                    // setEdit(true)
                                    setEditt(true)
                                }}
                                tailw='px-0 py-0 font-bold '
                            />
                            <Button
                                stayLight
                                theme={theme}
                                text='Delete'
                                onClick={deletePost}
                                tailw='px-0 py-0 font-bold '
                            />
                        </>}
                        
                        <div
                        className='flex gap-2 items-center'
                    >
                        <Button
                        stayLight
                        theme={theme}
                        text={isCurrentUser ? `${post.user.username}` : (following ? 'Unfollow' : 'Follow')}
                        onClick={ isCurrentUser ? () => {navigate(`${post.user.username}`)} : Follow}
                        tailw='px-0 py-0 font-bold  w-full'
                    />
                        <Button
                            stayLight
                            theme={theme}
                            text='X'
                            onClick={() => {
                                setVisible(false)
                                // setEditt(false)
                                // handleEdit()
                            }}
                            tailw='px-0 py-0 font-bold w-10 h-10 flex justify-center items-center  '
                        />
                    </div>
                </div>


                <div
                    style={{
                        transform: editt ? 'translateX(0)' : 'translateX(100%)',
                        opacity: editt ? '1' : '0',
                        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out'
                    }}
                    className='flex flex-col h-full w-full justify-center gap-2'
                >
                    <EditField
                        placeholder='Caption'
                        type='text'
                        value={editCaption}
                        onChange={(e: any) => {
                            setEditCaption(e.target.value)
                        }}
                        style={{
                            backgroundColor: '#181818',
                            color: theme.text,
                        }}
                    />

                    <div
                        className='flex gap-2 items-center'
                    >
                        <Button
                            stayLight
                            theme={theme}
                            text='X'
                            onClick={() => {
                                // setVisible(false)
                                setEditt(false)
                                // handleEdit()
                            }}
                            tailw='px-0 py-0 font-bold w-10 h-10 flex justify-center items-center  '
                        />
                        <Button
                            stayLight
                            theme={theme}
                            text='Edit'
                            onClick={() => {
                                setVisible(false)
                                setEditt(false)
                                handleEdit()
                            }}
                            tailw='px-0 py-0 font-bold w-full '
                        />
                    </div>


                </div>
            </div>


        </div>
    )
}

export default FeedMenu