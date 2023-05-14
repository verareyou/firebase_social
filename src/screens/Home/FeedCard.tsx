import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dotmenu, like, likeFilled, msg } from '../../assets/Icons'
import { useNavigate } from 'react-router-dom'
import { getPostById, likePost } from '../../services/Post'
import { FetchPostProps } from '../../models/PostModel'
import { getUserByUid } from '../../services/User'
import { setLoading } from '../../redux/Slice'
import { motion } from 'framer-motion'
import { randomEmoji } from '../../utils/Operations'

const FeedCard = ({ post_Id }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [liked, setLiked] = useState<boolean>(false)
    const [post, setPost] = useState(null as any)
    const [showPost, setShowPost] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)

    // console.log(post)



    const fetchPost = async () => {
        setLoading(true)
        const res = await getPostById(post_Id.id)
        console.log(res)
        if (res) {

            const isLiked = res.likes.find((like: any) => like.user_id === user.uid)
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
            setPost(res)
            setShowPost(true)
        }
        setLoading(false)
    }
    useEffect(() => {

        fetchPost()

    }, [])

    useEffect(() => {
        fetchPost()
    }, [trigger])

    const handlePostLike = async () => {
        const res = await likePost(post_Id.id, user)
        if (res) {
            // setPost(res)
            setLiked(!liked)
            setTrigger(!trigger)
        }
    }


    return (
        <div
            // initial={{ 
            //     opacity: 0.7,
            //     scale: 0.95,
            //     // transform: 'translateY(20px)'
            //  }}
            // // animate={{ 
            // //     opacity: 1,
            // //     // scale: 1,
            // //     // transform: 'translateY(0px)'
            // //  }}
            // whileInView={{ 
            //     opacity: 1,
            //     scale: 1,
            //  }}
            // transition={{ 
            //     duration: 0.2,
            //     // ease: 'easeInOut',
            //  }}
            style={{
                color: theme.text,
            }}
            className='flex relative flex-col flex-grow gap-2 justify-between items-center overflow-hidden rounded-3xl outline aspect-[4/5] max-sm:w-full md:h-[500px]'
        >
            {/* <div
                className={'absolute flex justify-center items-center top-0 left-0 right-0 backdrop-blur-[2px] text-6xl z-[9] pointer-events-none bottom-0 duration-150 ' + (loading ? ' opacity-100' : ' opacity-0')}
            >
                {randomEmoji()}
            </div> */}
            <div
                style={{
                    backgroundColor: theme.mode === 'dark' ? '#1f1f1f55' : '#f8f8f833',
                }}
                className='flex outline backdrop-blur-[2px] z-[1] right-2 gap-4 flex-row items-center rounded-full justify-between h-[52px] px-2 mt-2 mx-2'
            >
                <div
                    onClick={() => navigate(`/${post.user.username}`)}
                    className='flex flex-row items-center gap-1 TouchableBlur'
                >
                    <img
                        src={showPost ? post.user.profileImage : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                        alt=""
                        className={'w-10 h-10 rounded-full duration-500 object-cover' + (showPost ? '' : 'blur-[5px]')}
                    />

                    <h1
                        className='ml-2 font-semibold text-white'
                    >
                        {showPost && post.user.username}
                    </h1>
                </div>
                <div
                    className=' TouchableBlur pr-2'
                    onClick={() => console.log('clicked')}
                >
                    <img
                        style={{
                            filter: theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'
                        }}
                        src={dotmenu}
                        alt=""
                        className='w-6 h-6 '
                    />
                </div>
            </div>

                {/* post image */}
                <img
                    loading={'lazy'}
                    src={showPost ? post.imageUrls[0] :
                        'https://w7.pngwing.com/pngs/658/248/png-transparent-black-screen-of-death-color-light-others-angle-rectangle-color-thumbnail.png'}
                    alt=""
                    className={' object-cover duration-500 absolute h-full w-full z-0 ' + (!showPost && 'invert blur-[5px] opacity-10')}
                />

            

            {/* <div
                style={{
                    // backgroundColor: theme.lightText,
                }}
                className=' opacity-30 rounded-full mb-1 mt-1 w-full md:h-[2px] h-[3px]'
            /> */}
        </div>
    )
}

export default FeedCard