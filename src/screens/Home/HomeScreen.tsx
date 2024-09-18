import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SideBar } from '../../components'
import { sortPostsByTime } from '../../utils/Operations'
import { getAllPosts, getAllPostsIds, getPostsOfFollowedUsers, getPostsOfSubscriptions } from '../../services/Post'
import Feed from './Feed'
import { setLoading, SetUser } from '../../redux/userSlice'
import SuggestionCard from './SuggestionCard'
import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { ConnectWallet } from '@thirdweb-dev/react'
import { StateType } from '../../redux/Store'
import { getUserByUid } from '../../services/User'

const HomeScreen = () => {
  const { user, theme, isAuth } = useSelector((state: StateType) => state)
  const navigate = useNavigate()
  const [FeedPosts, setFeedPosts] = useState<any>([])
  const dispatch = useDispatch()
  const [subsFeed, setSubsFeed] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuth) {
      // dispatch(setLoading(false))
      return navigate('/accounts/login')
    } else {
      getUserByUid(user.uid).then((res) => {
        if (!res) return
        dispatch(SetUser(null))
        dispatch(SetUser(res))
        console.log(res, 'user')

      })
    }
  }, [isAuth])

  const fetchFeedPosts = async () => {
    setFeedPosts([])

    if (subsFeed) {

      const res = await getPostsOfSubscriptions(user.uid)

      if (res) {
        const sortedPosts = sortPostsByTime(res)
        setFeedPosts(sortedPosts)
      } else {
        setFeedPosts([])
      }
    } else {
      console.log('fetching feed posts')
      dispatch(setLoading(true))
      const res = await getPostsOfFollowedUsers(user.uid)

      if (res) {
        const sortedPosts = sortPostsByTime(res)
        setFeedPosts(sortedPosts)
      } else {
        setFeedPosts([])
      }
    }
    dispatch(setLoading(false))
  }
  useEffect(() => {
    console.log('fetching feed posts')
    fetchFeedPosts()
  }, [user, subsFeed])

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
        toggle={subsFeed}
        setToggle={setSubsFeed}
      />

      <SuggestionCard />

    </div>
  )
}

export default HomeScreen