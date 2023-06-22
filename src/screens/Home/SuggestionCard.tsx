import { useSelector } from "react-redux"
import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { lightMode, darkMode, menu } from "../../assets/Icons"
import { ToggleTheme } from "../../components"
import QuickSetting from "../../components/Home/QuickSetting"

const SuggestionCard = () => {
    const { theme, user } = useSelector((state: any) => state)
    const [show, setShow] = useState(false)

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

            className={' flex-col h-[400px] w-[400px] mr-[-200px] sticky top-4 hidden lg:flex rounded-3xl gap-2  '}
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
                className='flex gap-2 z-[1] items-center justify-between rounded-full p-2'
            >
                <div
                    className='flex gap-2 items-center'
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
                <div
                    className='mr-2 flex flex-row items-center gap-2 '
                >
                <ToggleTheme />
                <div
                    onClick={() => setShow(!show)}
                    className='flex items-center justify-center cursor-pointer'
                >
                    <img
                        style={{
                            filter: theme.mode === 'dark' ? 'invert(1)' : 'invert(0)',
                        }}
                        src={menu}
                        className='h-5 w-5 -mt-[1px] '
                        alt="menu"
                    />
                </div>
                </div>
            </div>

            {/* quick settings */}
            <div
                className=' mb-[-4px] '
            >
                <QuickSetting
                    visible={show}
                />
            </div>


            {/* suggestions for you */}

            <div>
                <h1
                    className='font-bold text-sm opacity-80 pl-2'
                >
                    Suggestions For You
                </h1>

            </div>
            <div>
                <div>

                </div>
            </div>
        </motion.div>
    )
}

// const QuickSettingHandler = () => {

//     const { theme } = useSelector((state: any) => state)
    
//     return (
//         <div>
//             <QuickSetting />

//         </div>
//     )
// }

export default SuggestionCard