import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthStateListener } from '../redux/AuthStateListener'

// Screens imports
import HomeScreen from '../screens/Home/HomeScreen'
import LoginRegisterPage from '../screens/Login'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import { ToggleTheme } from '../components'

const AppRouter = () => {
    const { isAuth,theme } = useSelector((state: any) => state)

    AuthStateListener();
    return (
        <Router>
            <style>
                {`
                    .bluebutton{
                        background-color: #0095f6;
                        color: white;
                        transition: all 0.15s ease;
                      }
                      
                      .bluebutton:hover{
                        opacity: 0.8;
                      }
                      
                      .button{
                        border: 1px solid ${theme.lightBorder};
                        transition: all 0.15s ease;
                      }
                      
                      .button:hover{
                        opacity: 0.8;
                      }
                `}
            </style>

            <ToggleTheme />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/:id" element={<ProfileScreen />} />
                <Route path="/accounts" >
                    <Route path="login" element={<LoginRegisterPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter