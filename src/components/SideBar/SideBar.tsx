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
import Search from './Search'

const SideBar = () => {

    const { user, theme, isAuth } = useSelector((state: any) => state)
    const [visible, setVisible] = useState({ visible: false, pos: { x: 0, y: 0 } })
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [route, setRoute] = useState<string>('home')
    const [prevRoute, setPrevRoute] = useState<string>('')
    const [createPost, setCreatePost] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [showSearch, setShowSearch] = useState<boolean>(false)

    useEffect(() => {
        if (window.innerWidth < 1000) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1000) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        )
    }, [])

    useEffect(() => {
        setRoute(window.location.pathname.split('/')[1] === '' ? 'home' : window.location.pathname.split('/')[1])
    }, [])

    useEffect(() => {
        if (isAuth) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [isAuth])


    const animate = {
        initial: {
            x: isMobile ? '0%' : '-100%',
            y: isMobile ? '100%' : '0%',
        },
        animate: {
            x: '0%',
            y: '0%',
            transition: {
                duration: 0.2,
                type: 'spring',
                bounce: 0.25,
                when: 'beforeChildren',
                staggerChildren: 0.2
            }
        },
    }

    return (<>
        {createPost && <CreatePost setRoute={setRoute} toggle={setCreatePost} />}
        {<Search
        setRoute={() => setRoute(prevRoute)} 
        isMobile={isMobile}
        ShowSearch={
            route === 'search' ? true : false
        } />}
        {!disabled && <motion.div
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
            className={`fixed md:top-0 md:bottom-0 md:flex-col md:left-0 md:justify-center duration-200 items-center box-border md:p-4 md:w-[100px] justify-evenly md:gap-8 md:h-screen md:m-0 flex bottom-0 left-0 right-0 p-2 rounded-full md:rounded-none mx-8 mb-2 z-[10000]  `}
        >
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
                onClick={() => { setPrevRoute(route); setRoute(route === 'search' ? prevRoute : 'search'); setShowSearch(true) }}
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

            <div
                onClick={() => {
                    setRoute('profile')
                    navigate(`/${user.username}`, { state: { user: user } })
                }}
                className='flex TouchableBlur justify-center items-center overflow-hidden h-[28px] w-[28px] m-2 rounded-full '
            >
                <img
                    className='object-cover overflow-hidden '
                    src={user.profileImage}
                    alt="profile" />
            </div>

        </motion.div>}
    </>
    )
}

export default SideBar