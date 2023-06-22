import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from '../../components'
import { sortPostsByTime } from '../../utils/Operations'
import { getAllPosts, getAllPostsIds } from '../../services/Post'
import Feed from './Feed'
import { setLoading } from '../../redux/userSlice'
import SuggestionCard from './SuggestionCard'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../config/firebase'

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
    const res = await getAllPosts()


    if (res) {
      const sortedPosts = sortPostsByTime(res)
      setFeedPosts(sortedPosts)
    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
    fetchFeedPosts()
  }, [user])

  return (
    <div
      className=' min-h-screen flex p-4 duration-300 gap-16 flex-row overflow-clip justify-center '

      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      {/* <SideBar />  */}
      <Feed
        Posts={FeedPosts}
        user={user}
        setPosts={setFeedPosts}
      />

      <SuggestionCard />

    </div>
  )
}

export default HomeScreen