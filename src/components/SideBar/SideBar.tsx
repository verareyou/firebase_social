import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ProfileView from '../ProfileView'

const SideBar = () => {

    const { isAuth, user, theme } = useSelector((state: any) => state)
    const [visible, setVisible] = useState({ visible: false, pos: { x: 0, y: 0 }})
    const navigate = useNavigate()
    const isMobile = window.innerWidth < 768;

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
        <>

            {/* sidebar */}
            
            <motion.div

                style={{
                    backgroundColor: isMobile ? `${theme.insecBackground}cc` : theme.background,
                    backdropFilter: isMobile ? 'blur(3px)' : 'blur(0px)',
                    borderRight: isMobile ? 'none' : `1px solid ${theme.lightBorder}`,
                    color: theme.text
                }}
                className={`fixed md:top-0 md:bottom-0 md:flex-col md:left-0 items-center box-border md:p-4 md:w-[130px] md:h-screen md:m-0 flex bottom-0 left-0 right-0 p-2 rounded-full md:rounded-none m-2 z-[999]  `}
            >
                    {visible.visible && <ProfileView username={user.username} visible={visible} setVisible={setVisible}
                    />}
                {/* {console.log(innerHeight)} */}
                {/* <div className='flex flex-col justify-center items-center'> */}


                        <div
                            onClick={() => { navigate(`/${user.username}`) }}
                            className='flex TouchableBlur justify-center items-center overflow-hidden w-16 h-16 rounded-full '
                            >
                            <img
                            onMouseEnter={(e) => { 
                                if(isMobile) return
                                setTimeout(() => {
                                    setVisible({...visible, visible: true, pos: {x: e.pageX, y: e.pageY}})
                                }, 300)
                            }}
                            onMouseLeave={() => {
                                if(isMobile) return
                                if(visible.visible) {
                                    setVisible({...visible, visible: false})
                                }
                            }
                            }
                                className='object-cover overflow-hidden '
                                src={user.profileImage}
                                alt="profile" />
                        </div>
                {/* </div> */}

                



            </motion.div>
        </>
    )
}

export default SideBar