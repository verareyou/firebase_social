import { useSelector } from "react-redux"
import { motion, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { lightMode, darkMode, menu } from "../../assets/Icons"
import { ToggleTheme } from "../../components"
import QuickSetting from "../../components/Home/QuickSetting"
import { ConnectWallet } from "@thirdweb-dev/react"
import { useNavigate } from "react-router-dom"
import { StateType } from "../../redux/Store"
import { getMySubscribers, getMySubscriptions, getUsersByUids } from "../../services/User"
import FollowingCardMid from "../../components/Following/FollowingCardMid"

const SuggestionCard = () => {
    const { theme, user } = useSelector((state: StateType) => state)
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

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
                className='flex gap-4 justify-end'
            >
                <ConnectWallet
                    style={{
                        height: '50px',
                        width: '100%',
                    }}
                />
            </div>
            <div
                style={{
                    backgroundColor: theme.secBackground,
                    border: `1px solid ${theme.lightBorder}`,
                }}
                className='flex gap-2 z-[1] items-center justify-between rounded-full p-2'
            >
                <div
                    role='button'
                    onClick={() => navigate(`/${user.username}`)}
                    className='flex gap-2 items-center cursor-pointer'
                >

                    <img src={user.profileImage}
                        className='rounded-full h-8 object-cover w-8'
                        alt="profile" />

                    <h1
                        className=' first-letter: font-bold'
                    >
                        {user.username} - {user.signAddress.slice(0, 7)}
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

            <QuickSettingHandler />
        </motion.div>
    )
}

const QuickSettingHandler = () => {

    const { theme, user } = useSelector((state: StateType) => state)

    const [subs, setSubs] = useState<any>([])

    useEffect(() => {
        getUsersByUids(user.subscribedTo).then((res) => {
            if (!res) return console.log('no subs')

            console.log(res, res)
            setSubs(res)
        })
    }, [])

    return (
        <div
            className='flex flex-col gap-2 rounded-[30px] p-2'
            style={{
                backgroundColor: theme.secBackground,
                border: `1px solid ${theme.lightBorder}`,

            }}
        >
            <h1
                className='font-bold text-sm opacity-80 pl-2'
            >
                Subscribed Users & creators
            </h1>

            <div>
                {subs.length > 0 ? subs?.map((data: any) => (
                    <FollowingCardMid
                        key={data.uid}
                        data={data}
                    />
                )) :
                    <h1
                        className="text-center flex justify-center items-center flex-1 text-xs font-semibold"
                    >
                        No Subscribers
                    </h1>}
            </div>

        </div>
    )
}

export default SuggestionCard