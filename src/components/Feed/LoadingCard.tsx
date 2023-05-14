import React from 'react'
import { randomEmoji } from '../../utils/Operations'
import { motion } from 'framer-motion'

const LoadingCard = ({loading}: any) => {
    return (
        <motion.div
            initial={{ 
                // opacity: 0,
                backdropFilter: 'blur(10px)',
            }}
            animate={{
                backdropFilter: 'blur(0px)',
            }}
            // whileInView={{
            //     backdropFilter: 'blur(0px)',
            // }}
            transition={{ duration: 2 }}
            className={'absolute flex justify-center items-center top-0 left-0 right-0  z-[9] pointer-events-none bottom-0  '}
        >
            <motion.h1
            initial={{
                scale: 0.5,
                opacity: 0,
            }}
            animate={{ 
                opacity: loading.state ? 1 : 0,
                scale: loading.state ? 1.5 : 0.5,
            }}
            transition={{ 
                duration: 0.2,
                type: 'spring',
                bounce: 0.5,
            }}
            className='text-[100px] pointer-events-none '
            >
            {loading.type === 'like' && '👍'}
            {loading.type === 'comment' && '💬'}
            {loading.type === 'random' && randomEmoji()}
            {loading.type === 'random' && randomEmoji()}
            {loading.type === 'random' && randomEmoji()}
            </motion.h1>
        </motion.div>
    )
}

export default LoadingCard