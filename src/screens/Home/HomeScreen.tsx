import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from '../../components'
import { sortPostsByTime } from '../../utils/Operations'
import { getAllPosts, getAllPostsIds } from '../../services/Post'
import Feed from './Feed'
import { setLoading } from '../../redux/Slice'

const HomeScreen = () => {
  const { user, theme, isAuth } = useSelector((state: any) => state)
  const navigate = useNavigate()
  const [FeedPosts, setFeedPosts] = useState<any>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuth) {
      // dispatch(setLoading(false))
      return navigate('/accounts/login')
    }
  }, [isAuth])



  const fetchFeedPosts = async () => {
    dispatch(setLoading(true))  
    const res = await getAllPostsIds()

    if (res) {
      const sortedPosts =  sortPostsByTime(res)
      setFeedPosts(sortedPosts)
    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
    fetchFeedPosts()
  }, [user])


  return (
    <div
      className=' min-h-screen flex flex-col overflow-x-hidden justify-center items-center'

      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      {/* <SideBar />  */}
      <Feed
        Posts={FeedPosts}
        user={user}
      />

    </div>
  )
}

export default HomeScreen