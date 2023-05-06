import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from '../screens/home'
import LoginRegisterPage from '../screens/login'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../config/firebase'
import { SetAuth, SetUser } from '../redux/Slice'

// import { store, persistor } from '../redux/store'


const AppRouter = () => {

    const { isAuth } = useSelector((state: any) => state)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                dispatch(SetAuth(true))
            } else {
                dispatch(SetUser(null))
            }
        })

        return unsubscribe
    }, [])
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginRegisterPage />} />
                </Routes>
            </Router>
    )
}

export default AppRouter