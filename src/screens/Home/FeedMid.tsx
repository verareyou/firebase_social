import FeedCard from './FeedCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getPostById, likePost } from '../../services/Post'
import { addComment } from '../../services/Mutations'

const FeedMid = ({Post, post_id}: any) => {
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
    <FeedCard
        post={post}
        liked={liked}
        showPost={showPost}
        openComment={openComment}
        setOpenComment={setOpenComment}
        fullCaption={fullCaption}
        setFullCaption={setFullCaption}
        loading={loading}
        handlePostLike={handlePostLike}
        handleComment={handleComment}
        comment={comment}
        setComment={setComment}

    />
  )
}

export default FeedMid