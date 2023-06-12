
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/User"
import { SetUser } from "./userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AuthStateListener = (listener: any) => {
    const dispatch = useDispatch()
    const { isAuth, user } = useSelector((state: any) => state)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserByUid(user.uid).then((res) => {
                    dispatch(SetUser(res))
                })
            } else {
                dispatch(SetUser(null))
            }
        })

        return unsubscribe
    }, [])

}