
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/User"
import { SetUser } from "../redux/Slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AuthStateListener = (listener: any) => {
    console.log(listener)
    const dispatch = useDispatch()
    const {isAuth, user} = useSelector((state: any) => state)
    console.log(isAuth, user)
    return useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid)
                getUserByUid(user.uid).then((res) => {
                    dispatch(SetUser(res))
                })
                // dispatch(SetAuth(true))
            } else {
                dispatch(SetUser(null))
            }
        })

        return unsubscribe
    }, [listener])
    
}