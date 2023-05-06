
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// get user by uid

export const getUserByUid = async (uid: string) => {
    console.log("Getting user by uid...");

    if (!uid) return null;

    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);

        const userData = docSnap.data() as UserProps;

        console.log("User found successfully!");

        return userData;
    } catch (error) {
        console.error("Error getting user", error);
        return null;
    }
}
