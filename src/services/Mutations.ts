import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"


export const updateUserByField = async (user, field, value) => {
    
    console.log(user, field, value)
    try{
        const docref = doc(db, 'users', user.uid)

        await updateDoc(docref, {
            [field]: value
        })

        return true
    } catch (e) {
        console.log(e)
        return false
    }
}