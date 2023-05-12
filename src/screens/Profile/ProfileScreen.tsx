import React, { useEffect, useState } from 'react'
import { logout } from '../../services/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoadingScreen, SideBar } from '../../components'
import Details from './Details'
import { getUserByUsername } from '../../services/User'


const ProfileScreen = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const { user, theme, isAuth } = useSelector((state: any) => state)
    const [loading, setLoading] = useState<boolean>(false)
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
        console.log('hey2')
        const username = window.location.pathname.split('/')[1]
        if (username === user.username){
            setCurrentUser(true)
            setDisplayUser(user)
        } else {
            setLoading(true)
            const newUser = await getUserByUsername(username)
            
            if (!newUser) {
                Navigate('/')
                return
            }
            
            setDisplayUser(newUser)
            setCurrentUser(false)
        }
        setTimeout(() => {
        setLoading(false)
        }, 300)
    }
    useEffect(() => {
        fetchUser()
    }, [window.location.pathname])
    
    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.text
            }}
            className=' min-h-screen flex '
        >
            {loading && <LoadingScreen loading={loading} icon='' />}
            {/* <LoadingScreen loading={loading} icon='' /> */}
            <SideBar />
            <Details
                user={displayUser}
                isCurrent={CurrentUser}
            />

        </div>
    )
}

export default ProfileScreen