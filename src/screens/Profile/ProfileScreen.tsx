import React, { useEffect, useState } from 'react'
import { logout } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoadingScreen, SideBar } from '../../components'
import Details from './Details'
import { getUserByUsername } from '../../services/User'

const ProfileScreen = () => {
    const Navigate = useNavigate()
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

    useEffect(() => {
        if (!isAuth) {
            Navigate('/accounts/login')
        }
    }, [isAuth])

    const fetchUser = async () => {
        setLoading(true)
        const newUser = await getUserByUsername(window.location.pathname.split('/')[1])
        !newUser && Navigate('/')
        if (newUser.username === user.username){
            setCurrentUser(true)
            setDisplayUser(newUser)
        } else {
            setDisplayUser(newUser)
            setCurrentUser(false)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetchUser()
    }, [user])

    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.text
            }}
            className=' min-h-screen flex '
        >
            <LoadingScreen loading={loading} icon='' />
            <SideBar />
            <Details
                user={displayUser}
                isCurrent={CurrentUser}
            />

        </div>
    )
}

export default ProfileScreen