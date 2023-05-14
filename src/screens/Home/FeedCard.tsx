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
import CommentCard from '../../components/Feed/CommentCard'
import LoadingCard from '../../components/Feed/LoadingCard'

const FeedCard = ({ post_Id }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [liked, setLiked] = useState<boolean>(false)
    const [post, setPost] = useState(null as any)
    const [showPost, setShowPost] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState({
        type: '',
        state: false
    })

    // console.log(post)

    const setLoad = (type: string) => {
        setLoading({
            type: type || '',
            state: type ? true : false
        })
    }

    const fetchPost = async () => {
        setLoad('like')
        const res = await getPostById(post_Id.id)
        // console.log(res)
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
        setLoad('')
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

            style={{
                color: theme.text,
            }}
            className='flex relative flex-col flex-grow gap-2 justify-between items-center overflow-hidden rounded-3xl aspect-[4/5] max-sm:w-full md:h-[500px]'
        >
            <LoadingCard
                loading={loading}  
            />
            <div
                style={{
                    backgroundColor: theme.mode === 'dark' ? '#1f1f1f55' : '#f8f8f833',
                }}
                className='flex backdrop-blur-[2px] z-[1] right-2 gap-4 flex-row items-center rounded-full justify-between h-[54px] px-2 mt-2 mx-2'
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

            <CommentCard
                liked={liked}
                onLike={handlePostLike}
                onComment={() => console.log('comment')}
                post={post}
                showPost={showPost}
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
