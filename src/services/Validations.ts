import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";


// is username exists

export const isSameUsername = async (username: string) => {
    const users = await getDocs(collection(db, "users"));
    const usersData = users.docs.map(doc => doc.data());
    const usernames = usersData.map(user => user.username);
    console.log(usernames)
    return usernames.includes(username);
}

// is email exists

export const isEmailExists = async (email: string) => {
    const users = await getDocs(collection(db, "users"));
    const usersData = users.docs.map(doc => doc.data());
    const emails = usersData.map(user => user.email);

    return emails.includes(email);
}