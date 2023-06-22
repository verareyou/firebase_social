import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthStateListener } from '../redux/AuthStateListener'
import { useEffect } from 'react'
import { setLoading } from '../redux/userSlice'

// Screens imports
import { LoadingScreen, SideBar, ToggleTheme } from '../components'
import HomeScreen from '../screens/Home/HomeScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import LoginRegisterPage from '../screens/Login/LoginRegisterScreen'
import ExploreScreen from '../screens/Explore/ExploreScreen'
import PostScreen from '../screens/Post/PostScreen'
import FollowingModel from '../components/Following/FollowingModel'
import SettingScreen from '../screens/Settings/SettingScreen'

const AppRouter = () => {
    const { isAuth, theme, ProfileUpdateListener } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    AuthStateListener(ProfileUpdateListener);

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
                </Route>
                <Route path="/post/:id" element={<PostScreen />} />
                <Route path="/explore" element={<ExploreScreen />} />
                <Route path="/accounts" >
                    <Route path="login" element={<LoginRegisterPage />} />
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