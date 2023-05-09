import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const SideBar = ({ user, theme }: any) => {

    const { isAuth } = useSelector((state: any) => state)
    
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
                variants={animate}
                initial='initial'
                animate='animate'
                exit='exit'

                style={{
                    backgroundColor: theme.secBackground,
                    color: theme.text
                }}
                className={`fixed top-4 bottom-4 rounded-lg md:flex flex-col hidden left-4 box-border p-4  `}
            >

                <div className='flex flex-col justify-center items-center'>
                    <div
                        className=' flex flex-col justify-center items-center w-full gap-2'
                    >
                        <div
                            className='flex justify-center items-center overflow-hidden w-16 h-16 rounded-full '
                        >
                            <img
                                className='object-cover overflow-hidden '
                                src={user.profileImage}
                                alt="profile" />
                        </div>
                        <div
                            style={{
                                backgroundColor: theme.insecBackground,
                            }}
                            className={'flex flex-col rounded-xl py-1 px-2 justify-center items-center  '}>
                            <h2
                                className='text-xs font-bold '
                            >
                                {user.username}
                            </h2>



                        </div>

                    </div>
                </div>

            </motion.div>
        </>
    )
}

export default SideBar