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
import EditField from '../../components/EditField'
import { Button } from '../../components'
import { addComment } from '../../services/Mutations'
import CommentList from '../../components/Feed/CommentList'

const FeedCard = ({ Post, post_Id }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [liked, setLiked] = useState<boolean>(false)
    const [post, setPost] = useState(null as any)
    const [showPost, setShowPost] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [fullCaption, setFullCaption] = useState(false)

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
        const res = await getPostById(Post.uid)

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
        if (!Post) {
            setLoad('random')
            fetchPost()
            setLoad('')
        } else {
            setPost(Post)
            const isLiked = Post.likes.find((like: any) => like.user_id === user.uid)
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
            setPost(Post)
            setShowPost(true)
            setLoad('')
        }
    }, [])

    useEffect(() => {
        fetchPost()
    }, [trigger])

    const handlePostLike = async () => {
        if (!liked) {
            setLoad('like')
        }

        const res = await likePost(Post.uid, user)
        if (res) {
            // setPost(res)
            setLiked(!liked)
            setTrigger(!trigger)
        }
    }

    const handleComment = async () => {
        setLoad('comment')
        if (!comment) return
        const res = await addComment(user, Post.uid, comment)
        // console.log(res)

        setLoad('')
        setComment('')
        if (res) {
            setOpenComment(false)
            setFullCaption(false)
            setTrigger(!trigger)
        }
    }


    return (
        <div

            style={{
                color: theme.text,
            }}
            className='flex relative flex-col  gap-2 justify-between items-center overflow-clip rounded-3xl aspect-[4/5] max-sm:w-full max-sm:min-w-[300px] md:min-w-[400px] md:h-[500px]'
        >
            <LoadingCard
                loading={loading}
            />
            <div
                style={{
                    backgroundColor: '#111111aa',
                }}
                className='flex backdrop-blur-[2px] z-[1] right-2 gap-4 flex-row items-center rounded-full justify-between h-[44px] px-1.5 mt-2 mx-2'
            >
                <div
                    onClick={() => navigate(`/${post.user.username}`)}
                    className='flex flex-row items-center gap-1 TouchableBlur'
                >
                    <img
                        src={showPost ? post.user.profileImage : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                        alt=""
                        className={'w-8 h-8 rounded-full duration-500 object-cover' + (showPost ? '' : ' blur-[50px]')}
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
                        // style={{
                        //     filter: theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'
                        // }}
                        src={dotmenu}
                        alt=""
                        className='w-6 h-6 invert'
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

            <div
                style={{
                    backgroundColor: openComment ? '#222222aa' : 'transparent',
                    // color: theme.background,
                    height: openComment ? '101%' : '62px',
                    transform: openComment ? 'translateY(-99.5%)' : 'translateY(-62px)',
                    overflowY: openComment ? 'auto' : 'hidden',
                }}
                className='flex flex-col absolute duration-200 top-[100%] left-0 right-0 z-[99] backdrop-blur-[2px] overflow-y-auto rounded-[30px] md:w-full gap-2 p-2 scrollbar scrollbar-thumb-[#b8c2d073] scrollbar-track-[transparent] scrollbar-h-2 scrollbar-w-1 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg'
            >
                <CommentCard
                    liked={liked}
                    onLike={handlePostLike}
                    onComment={() => setOpenComment(!openComment)}
                    post={post}
                    showPost={showPost}
                    fullCaption={fullCaption}
                    openComment={openComment}
                    setOpenComment={setOpenComment}
                    setFullCaption={setFullCaption}
                />
                <div
                    className='flex flex-row items-center gap-2'
                >
                    <EditField
                        textArea
                        style={{
                            color: 'white'
                        }}
                        placeholder='Add a comment...'
                        tailw=' h-14 flex-1'
                        value={comment}
                        onChange={(e: any) => setComment(e.target.value)}

                    />
                    <Button
                        theme={theme}
                        style={{
                            color: 'white',
                        }}
                        onClick={() => handleComment()}
                        text='Post'
                        disabled={comment.length < 1}
                    />
                </div>
                {showPost && openComment && post.comments.length > 0 &&
                    <CommentList
                        post={post.comments}
                    />
                }

            </div>
        </div>
    )
}

export default FeedCard
