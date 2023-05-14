import React, { useEffect, useState } from 'react'
import { logout } from '../../services/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingScreen, SideBar } from '../../components'
import Details from './Details'
import { getUserByUsername } from '../../services/User'
import { setLoading } from '../../redux/Slice'


const ProfileScreen = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { user, theme, isAuth } = useSelector((state: any) => state)
    const [CurrentUser, setCurrentUser] = useState<any>(false)
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
    // const state = location.state

    // useEffect(() => {
    //     if (!isAuth) {
    //         Navigate('/accounts/login')
    //     }
    // }, [isAuth])

    const fetchUser = async () => {

        const username = window.location.pathname.split('/')[1]
        // console.log(username)
        // console.log(location.pathname)
        dispatch(setLoading(true))
        const newUser = await getUserByUsername(username)
        
        if (!newUser) {
            // dispatch(setLoading(false))
            Navigate('/')
            return
        }
        console.log(newUser.username, user.username)
        if (newUser.username === user.username){
            setCurrentUser(true)
            setDisplayUser(newUser)
        } else {
            
            setDisplayUser(newUser)
            setCurrentUser(false)
        }
        setTimeout(() => {
            dispatch(setLoading(false))
        }, 300)
    }
    // useEffect(() => {
    //     fetchUser()
    // }, [])
    useEffect(() => {
        fetchUser()
    }, [location.pathname, user])
    
    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.text
            }}
            className=' min-h-screen flex '
        >
            {/* <SideBar /> */}
            <Details
                user={displayUser}
                isCurrent={CurrentUser}
            />

        </div>
    )
}

export default ProfileScreen