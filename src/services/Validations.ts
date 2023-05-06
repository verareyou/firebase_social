import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";


// is same username


export const isSameUsername = async (username: string) => {
    const users = await getDocs(collection(db, "users"));
    const usersData = users.docs.map(doc => doc.data());
    const usernames = usersData.map(user => user.username);

    return usernames.includes(username);
}