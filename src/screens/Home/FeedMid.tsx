import FeedCard from './FeedCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { DeletePost, editCaption, getPostById, likePost } from '../../services/Post'
import { FollowUser, addComment } from '../../services/UserMutations'
import { SetUser } from '../../redux/userSlice'
import { getUserByUid } from '../../services/User'

const FeedMid = ({ Post, post_id, setPosts }: any) => {
    const { theme, user } = useSelector((state: any) => state)
    const [liked, setLiked] = useState<boolean>(false)
    const [post, setPost] = useState(null as any)
    const [showPost, setShowPost] = useState<boolean>(false)
    const [trigger, setTrigger] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [openComment, setOpenComment] = useState<boolean>(false)
    const [fullCaption, setFullCaption] = useState(false)
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [following, setFollowing] = useState(false)

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
        setLoad('random')
        const res = await getPostById(Post.uid)

        if (res) {

            if (res.user.user_uid === user.uid) {
                setIsCurrentUser(true)
            } else {
                setIsCurrentUser(false)
            }

            const isLiked = res.likes.find((like: any) => like.user_id === user.uid)
            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }

            const isFollowing = user.Following.find((follower: any) => follower === res.user.user_uid)
            if (isFollowing) {
                setFollowing(true)
            } else {
                setFollowing(false)
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

    const deletePost = async () => {
        setLoad('random')
        const res = await DeletePost(post.uid, user)
        if (res) {
            if (post_id) {
                setLoad('')
                navigate(-1)
                return
            }
            setPosts((prevState: any) => {
                const newPosts = prevState.filter((p: any) => p.uid === post.uid)
                return newPosts
            })
            dispatch(SetUser(res))
            setLoad('')
        }
    }

    const Follow = async () => {
        setLoading({
            type: 'follow',
            state: true
        })
        const userToFollow = await getUserByUid(post.user.user_uid)
        const res = await FollowUser(user, userToFollow)
        if (!res) {
            setLoading({
                type: '',
                state: false
            })
            return
        }
        dispatch(SetUser(res.updatedUser))
        setFollowing(!following)
        setLoading({
            type: '',
            state: false
        })
    }

    const setEdit = async (caption: any) => {
        setLoad('edit')

        const res = await editCaption(post.uid, caption)

        if (res) {
            setPost(res)
            setLoad('')
        } else {
            setLoad('')
        }
    }


    return (
        <FeedCard
            isCurrentUser={isCurrentUser}
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
            Follow={Follow}
            following={following}
            setEditCaption={setEdit}
            deletePost={deletePost}
        />
    )
}

export default FeedMid