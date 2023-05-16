import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FeedCard from '../Home/FeedCard'
import { getPostById } from '../../services/Post'
import PostScreenCard from './PostScreenCard'

const PostScreen = () => {
  const [post, setPost] = React.useState<any>()
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, user } = useSelector((state: any) => state)

  useEffect(() => {
    const id = params.id  as string

    const fetchPost = async () => {
      const res = await getPostById(id)
      console.log(res)
      setPost(res)
    }

    fetchPost()
  }, [])




  return (
    <div
      style={{
        color: theme.text,
        backgroundColor: theme.background,
      }}
      className=' flex-1 min-h-screen items-center overflow-x-hidden justify-center md:pl-[100px] flex flex-col gap-2 p-4 '
    >
      {post &&
     <PostScreenCard
        post={post}
      />
      }
    </div>
  )
}

export default PostScreen