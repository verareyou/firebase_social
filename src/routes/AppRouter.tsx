import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthStateListener } from '../redux/AuthStateListener'
import { useEffect } from 'react'
import { setLoading, SetUser } from '../redux/userSlice'

// Screens imports
import { LoadingScreen, SideBar, ToggleTheme } from '../components'
import HomeScreen from '../screens/Home/HomeScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import ExploreScreen from '../screens/Explore/ExploreScreen'
import PostScreen from '../screens/Post/PostScreen'
import FollowingModel from '../components/Following/FollowingModel'
import SettingScreen from '../screens/Settings/SettingScreen'
import LoginRegisterScreen from '../screens/login/LoginRegisterScreen'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserByUid } from '../services/User'
import { auth } from '../config/firebase'
import { ConnectWallet } from '@thirdweb-dev/react'
import { Toaster } from 'react-hot-toast'

const AppRouter = () => {
    const { isAuth, theme, ProfileUpdateListener } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    // AuthStateListener(ProfileUpdateListener);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserByUid(user.uid).then((res) => {
                    if(!res) return
                    dispatch(SetUser(res))
                    console.log(res, 'user')
                    return <Navigate to='/' />
                })
            } else {
                dispatch(SetUser(null))
                return <Navigate to='/accounts/login' />
            }
        })

        return unsubscribe
    }, [])

    useEffect(() => {
        dispatch(setLoading(false))
    }, [])

    return (
        <Router>
            {/* <ToggleTheme /> */}
            <SideBar />
            <LoadingScreen />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/:id" element={<ProfileScreen />} >
                    <Route path='edit' element={<ProfileScreen />} />
                    <Route path='following' element={<ProfileScreen />} />
                    <Route path='followers' element={<ProfileScreen />} />
                    <Route path='subscribers' element={<ProfileScreen />} />
                    <Route path='subscribedTo' element={<ProfileScreen />} />
                </Route>
                <Route path="/post/:id" element={<PostScreen />} />
                <Route path="/explore" element={<ExploreScreen />} />
                <Route path="/accounts" >
                    <Route path="login" element={isAuth ? <Navigate to='/' /> : <LoginRegisterScreen />} />
                    <Route path="settings" element={<SettingScreen />} />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </Router>
    )
}

export default AppRouter