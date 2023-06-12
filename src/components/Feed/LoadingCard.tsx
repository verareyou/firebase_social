import React from 'react'
import { randomEmoji } from '../../utils/Operations'
import { motion } from 'framer-motion'

const LoadingCard = ({loading}: any) => {
    return (
        <div

            style={{
                opacity: loading.state ? 1 : 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            
            className={'absolute flex justify-center items-center top-0 left-0 right-0  z-[9999999] pointer-events-none bottom-0  '}
        >
            <motion.h1

            animate={{ 
                scale: loading.state ? 1 : 0.5,
            }}
            transition={{ 
                duration: 0.3,
                type: 'spring',
                bounce: 0.5,
            }}

            className={'text-[100px] font-bold pointer-events-none '}
            >
            {loading.type === 'like' && '<3'}
            {loading.type === 'comment' && '💬'}
            {loading.type === 'random' && randomEmoji()}
            {/* {loading.type === 'random' && randomEmoji()}
            {loading.type === 'random' && randomEmoji()} */}
            </motion.h1>
        </div>
    )
}

export default LoadingCard