import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { getDate } from "../utils/Operations"


export const updateUserByField = async (
    user: any,
    field: string,
    value: string
) => {
    
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

export const FollowUser = async (
    user: any,
    userToFollow: any
) => {

    try{
        const docref = doc(db, 'users', user.uid)
        const docref2 = doc(db, 'users', userToFollow.uid)

        const userDoc = (await getDoc(docref)).data()

        if(userDoc!.Following.includes(userToFollow.uid)) {

            await updateDoc(docref, {
                Following: userDoc!.Following.filter((uid: string) => uid !== userToFollow.uid)
            })

            await updateDoc(docref2, {
                Followers: userToFollow.Followers.filter((uid: string) => uid !== user.uid)
            })

            const updatedUser = (await getDoc(docref)).data()
            const updatedUserToFollow = (await getDoc(docref2)).data()

            return { updatedUser, updatedUserToFollow }

        } else {

        await updateDoc(docref, {
            Following: [...user.Following, userToFollow.uid]
        })


        await updateDoc(docref2, {
            Followers: [...userToFollow.Followers, user.uid]
        })

        const updatedUser = (await getDoc(docref)).data()
        const updatedUserToFollow = (await getDoc(docref2)).data()

        return { updatedUser, updatedUserToFollow }

        }
    } catch (e) {
        console.log(e)
        return false
    }
}


// add comment

export const addComment = async (
    user: any,
    post: any,
    comment: string
) => {

    try {

        const docref = doc(db, 'posts', post.uid)
        const docdata = (await getDoc(docref)).data()

            await updateDoc(docref, {
                comments: [...docdata!.comments, {
                    uid: user.uid,
                    comment: comment,
                    createdAt: getDate()
                }]
            })

        const updatedPost = (await getDoc(docref)).data()

        return updatedPost
        
    } catch (error) {
        console.log(error)
        return null
    }
}