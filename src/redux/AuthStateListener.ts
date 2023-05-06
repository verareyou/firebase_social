
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
import { getUserByUid } from "../services/User"
import { SetUser } from "../redux/Slice"
import { useDispatch } from "react-redux"

export const AuthStateListener = () => {
    const dispatch = useDispatch()
    
    return useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
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