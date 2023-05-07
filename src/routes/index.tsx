import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthStateListener } from '../redux/AuthStateListener'

// Screens imports
import HomePage from '../screens/home'
import LoginRegisterPage from '../screens/login'
import Profile from '../screens/home/ProfileScreen/Profile'

const AppRouter = () => {
    const { isAuth } = useSelector((state: any) => state)

    AuthStateListener();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                    <Route path="/:id" element={<Profile />} />
                <Route path="/accounts" >
                    <Route path="login" element={<LoginRegisterPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter