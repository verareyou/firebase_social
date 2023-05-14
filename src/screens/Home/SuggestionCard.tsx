import { useSelector } from "react-redux"
import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"

const SuggestionCard = () => {
    const { theme, user } = useSelector((state: any) => state)

    const motionVariants = {
        initial: {
            opacity: 0,
            translateX: '100%',
        },
        animate: {
            opacity: 1,
            translateX: 0,
        },
        exit: {
            opacity: 0,
            translateX: '100%',
        }
    }

    return (
        <motion.div
            // {...motionVariants}
            // transition={{duration: 0.5}}
            
            className={' flex-col h-[400px] w-[400px] sticky top-4 hidden lg:flex rounded-3xl gap-2  '}
            style={{
                color: theme.text,
                // border: `1px solid ${theme.lightBorder}`,
            }}
        >
            <div
                style={{
                    backgroundColor: theme.secbackground,
                    border: `1px solid ${theme.lightBorder}`,
                }}
                className='flex flex-row gap-2 TouchableBlur items-center rounded-full p-2'
            >
                <img src={user.profileImage}
                    className='rounded-full h-8 object-cover w-8'
                alt="profile" />

                <h1
                    className=' first-letter: font-bold'
                >
                    {user.username}
                </h1>
            </div>
        </motion.div>
    )
}

export default SuggestionCard