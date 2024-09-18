import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Details from './Details'
import { getUserByUsername } from '../../services/User'
import { SetUser, setLoading } from '../../redux/userSlice'
import { FollowUser, SubscribeUser } from '../../services/UserMutations'
import { UserProps } from '../../models/UserModel'
import { useEther } from '../../Context/EtherProvider'
import { StateType } from '../../redux/Store'


const ProfileScreen = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const { userSubscribe, userUnsubscribe } = useEther()
    const { user, theme, isAuth } = useSelector((state: StateType) => state)
    const [CurrentUser, setCurrentUser] = useState<boolean>(false)
    const [following, setFollowing] = useState<boolean>(false)
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
    const [displayUser, setDisplayUser] = useState<UserProps>(null as any)

    console.log(user, 'user')

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

    const subscribe = async () => {
        dispatch(setLoading(true))
        if (isSubscribed) {
            await userUnsubscribe(displayUser.signAddress)
            await SubscribeUser(user.uid, displayUser.uid)
        } else {

            console.log(displayUser, 'signAddress')
            await userSubscribe(displayUser.signAddress)
            await SubscribeUser(user.uid, displayUser.uid)
        }
        await fetchUser()
        dispatch(setLoading(false))
    }

    const fetchUser = async () => {
        dispatch(setLoading(true))

        const username = params.id as string

        console.log(username, 'username')

        const newUser = await getUserByUsername(username) 
        if (!newUser) {
            dispatch(setLoading(false))
            Navigate('/')
            return
        }

        if (newUser.username === user.username) {
            console.log('current user')
            setCurrentUser(true)
            setDisplayUser(newUser)
        } else {
            console.log('not current user', newUser.signAddress)
            const isFollowing = newUser.Followers!.find((followingUser: any) => followingUser === user.uid)
            const isFollowing2 = user.Following!.find((followingUser: any) => followingUser === newUser.uid)
            const isSubscribed1 = newUser.subscribers!.find((sub: string) => sub === user?.uid)
            const isSubscribed2 = user.subscribedTo!.find((sub: string) => sub === newUser?.uid)

            if (isSubscribed1 && isSubscribed2) {
                setIsSubscribed(true)
            } else {
                setIsSubscribed(false)
            }

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
        }, 100)
    }

    useEffect(() => {
        fetchUser()

        return () => {
            setDisplayUser(null as any)
        }
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
            {displayUser &&
                <Details
                    user={displayUser}
                    isCurrent={CurrentUser}
                    Follow={Follow}
                    following={following}
                    subscribe={subscribe}
                    isSubscribed={isSubscribed}

                />
            }

        </div>
    )
}

export default ProfileScreen