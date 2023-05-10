import { getUserByUid, getUserByUsername } from "../services/User"


export const NavigateProfile = async (username: string, user: any, navigate: any) => {
    if (username === user.username) {
        navigate(`/${user.username}`, { state: { displayUser: user, CurrentUser: true } }) 
        } else {
        const res = await getUserByUsername(username)
        console.log(res)
        if (res === null) {
            navigate('/404')
            return
        }
        navigate(`/${res.username}`, { state: { displayUser: res, CurrentUser: false } })
    }
}


export const getUserProfile = async (username: string,CurrentUser: any ,setUser: any, setCurrent: any) => {
    const res = await getUserByUsername(username)
    if (res === null) {
        return
    }
    if (CurrentUser === username) {
        setUser(res)
        setCurrent(true)
    }
    else {
        setUser(res)
        setCurrent(false)
    }
}