import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthStateListener } from '../redux/AuthStateListener'

// Screens imports
import HomeScreen from '../screens/Home/HomeScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import { LoadingScreen, ToggleTheme } from '../components'
import LoginRegisterPage from '../screens/Login/LoginRegisterScreen'
import ExploreScreen from '../screens/Explore/ExploreScreen'

const AppRouter = () => {
    const { isAuth,theme, ProfileUpdateListener } = useSelector((state: any) => state)

    AuthStateListener(ProfileUpdateListener);

    return (
        <Router>
            <ToggleTheme />
            <LoadingScreen />
            <Routes>
                <Route path="/" element={
                    isAuth ? <HomeScreen /> : <LoginRegisterPage />
                } />
                <Route path="/:id" element={<ProfileScreen />} >
                    <Route path='edit' element={<ProfileScreen />} />
                </Route>
                <Route path="/explore" element={<ExploreScreen />} />
                <Route path="/accounts" >
                    <Route path="login" element={<LoginRegisterPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter