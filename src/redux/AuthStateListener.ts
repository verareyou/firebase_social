
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/User"
import { SetUser } from "../redux/Slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AuthStateListener = () => {
    const dispatch = useDispatch()
    return useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserByUid(user.uid).then((res) => {
                    dispatch(SetUser(res))
                })
                // dispatch(SetAuth(true))
            } else {
                dispatch(SetUser(null))
            }
        })

        return unsubscribe
    }, [])
    
}