import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProfileView from '../ProfileView'
import ExporeIcon from '../Icons/ExploreIcon'
import HomeIcon from '../Icons/HomeIcon'
import SearchIcon from '../Icons/SearchIcon'
import CreateIcon from '../Icons/CreateIcon'
import CreatePost from '../Post/CreatePost'

const SideBar = () => {

    const { user, theme, isAuth } = useSelector((state: any) => state)
    const [visible, setVisible] = useState({ visible: false, pos: { x: 0, y: 0 } })
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [route, setRoute] = useState<string>('home')
    const [createPost, setCreatePost] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        }
    }, [window.innerWidth])

    useEffect(() => {
        setRoute(window.location.pathname.split('/')[1] === '' ? 'home' : window.location.pathname.split('/')[1])
    }, [])

    useEffect(() => {
        if(isAuth) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [isAuth])


    const animate = {
        initial: {
            x: '-100vw'
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.5,
                type: 'spring',
                bounce: 0.25,
                when: 'beforeChildren',
                staggerChildren: 0.2
            }
        },
    }

    return (
        !disabled && <>
            {createPost && <CreatePost setRoute={setRoute} toggle={setCreatePost} />}
            <motion.div
                variants={animate}
                initial='initial'
                animate='animate'
                exit='initial'
                
                style={{
                    background: isMobile ? theme.blurBackground
                        : theme.background,
                    backdropFilter: isMobile ? 'blur(3px)' : 'blur(0px)',
                    borderRight: isMobile ? 'none' : `1px solid ${theme.lightBorder}`,
                    color: theme.text
                }}
                className={`fixed md:top-0 md:bottom-0 md:flex-col md:left-0 items-center box-border md:p-4 md:w-[100px] justify-evenly md:justify-normal md:gap-8 md:h-screen md:m-0 flex bottom-0 left-0 right-0 p-2 rounded-full md:rounded-none m-6 z-[999]  `}
            >
                {visible.visible && <ProfileView username={user.username} visible={visible} setVisible={setVisible}
                />}

                {/* minimal home logo */}

                <div
                    onClick={() => { navigate('/'); setRoute('home') }}
                    className='flex TouchableBlur justify-center items-center overflow-hidden w-[48px] h-[48px] rounded-full '
                >
                    <HomeIcon
                        color={theme.text}
                        route={route}
                    />

                </div>

                <div
                    onClick={() => { setRoute('search') }}
                    className='flex TouchableBlur justify-center items-center md:mt-1 md:-mb-1  overflow-hidden w-[48px] h-[48px] rounded-full '
                >
                    <SearchIcon
                        color={theme.text}
                        route={route}
                    />

                </div>

                <div
                    onClick={() => { setRoute('explore'); navigate('/explore') }}
                    className='flex TouchableBlur justify-center items-center overflow-hidden w-[48px] h-[48px] rounded-full '
                >
                    <ExporeIcon
                        color={theme.text}
                        route={route}
                    />

                </div>
                <div
                    onClick={() => { setRoute('create'); setCreatePost(true) }}
                    className='flex TouchableBlur justify-center items-center overflow-hidden w-[48px] h-[48px] rounded-full '
                >
                    <CreateIcon
                        color={theme.text}
                        route={route}
                    />



                </div>

                {/* <div
                    onClick={() => { navigate('/notifications') }}
                    className='flex TouchableBlur justify-center items-center overflow-hidden w-[48px] h-[48px] rounded-full '
                >

                    <svg aria-label="Activity Feed" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><path clip-rule="evenodd" d="M12 3c-4.97 0-9 4.03-9 9v.5a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5V12c0-4.97-4.03-9-9-9Zm0 2c4.42 0 8 3.58 8 8v.5a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V13c0-4.42 3.58-8 8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                        <path d="M12 18c-2.76 0-5-2.24-5-5h10c0 2.76-2.24 5-5 5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                    </svg>

                </div> */}


                <div
                    onClick={() => {
                        // setRoute('profile')
                        navigate(`/${user.username}`, { state: { user: user } })
                    }}
                    className='flex TouchableBlur justify-center items-center overflow-hidden h-[28px] w-[28px] m-2 rounded-full '
                >
                    <img
                        // onMouseEnter={(e) => {
                        //     if (isMobile) return
                        //     setTimeout(() => {
                        //         setVisible({ ...visible, visible: true, pos: { x: e.pageX, y: e.pageY } })
                        //     }, 500)
                        // }}
                        // onMouseLeave={() => {
                        //     if (isMobile) return
                        //     if (visible.visible) {
                        //         setVisible({ ...visible, visible: false })
                        //     }
                        // }}
                        className='object-cover overflow-hidden '
                        src={user.profileImage}
                        alt="profile" />
                </div>



            </motion.div>
        </>
    )
}

export default SideBar