import React, { useEffect, useState } from 'react'
import { logout } from '../../services/Auth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingScreen, SideBar } from '../../components'
import Details from './Details'
import { getUserByUsername } from '../../services/User'
import { SetUser, setLoading } from '../../redux/Slice'
import { FollowUser } from '../../services/UserMutations'


const ProfileScreen = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const params = useParams()
    const { user, theme, isAuth } = useSelector((state: any) => state)
    const [CurrentUser, setCurrentUser] = useState<any>(false)
    const [following, setFollowing] = useState<boolean>(false)
    const [displayUser, setDisplayUser] = useState<any>({
        username: '',
        name: '',
        profileImage: '',
        bio: '',
        website: '',
        Posts: [],
        Followers: [],
        Following: []
    })

    // useEffect(() => {
    //     if (!isAuth) {
    //         Navigate('/accounts/login')
    //     }
    // }, [isAuth])

    const Follow = async () => {
        dispatch(setLoading(true))
        const res = await FollowUser(user, displayUser)
        console.log(res)
        if (!res) {
            dispatch(setLoading(false))
            return
        }
        dispatch(SetUser(res.updatedUser))
        dispatch(setLoading(false))
        setFollowing(!following)
    }

    const fetchUser = async () => {

        const username = params.id as string

        dispatch(setLoading(true))
        const newUser = await getUserByUsername(username)

        if (!newUser) {
            dispatch(setLoading(false))
            Navigate('/')
            return
        }

        if (newUser.username === user.username) {
            setCurrentUser(true)
            setDisplayUser(newUser)
        } else {
            const isFollowing = newUser.Followers!.find((followingUser: any) => followingUser === user.uid)
            const isFollowing2 = user.Following!.find((followingUser: any) => followingUser === newUser.uid)
            if (isFollowing && isFollowing2) {
                setFollowing(true)
            } else {
                setFollowing(false)
            }
            setDisplayUser(newUser)
            setCurrentUser(false)
        }
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 300)
    }
    useEffect(() => {
        fetchUser()
    }, [])
    useEffect(() => {
        fetchUser()
    }, [params.id, user])

    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.text
            }}
            className=' min-h-screen flex p-2 md:p-4 '
        >
            {/* <SideBar /> */}
            <Details
                user={displayUser}
                isCurrent={CurrentUser}
                Follow={Follow}
                following={following}

            />

        </div>
    )
}

export default ProfileScreen