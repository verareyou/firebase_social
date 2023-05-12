
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { ResizeFile } from "../utils/ResizeImage";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserProps } from "../models/UserModel";

// get user by uid

export const getUserByUid = async (uid: string) => {
    // console.log("Getting user by uid...");

    if (!uid) return null;

    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);

        const userData = docSnap.data() as UserProps;

        // console.log("User found successfully!");

        return userData;
    } catch (error) {
        console.error("Error getting user", error);
        return null;
    }
}

// get user by username

export const getUserByUsername = async (username: string) => {
    // console.log("Getting user by username...");

    if (!username) return null;

    try {
        const querySnapshot = query(collection(db, "users"), where("username", "==", username));
        const querySnapshotData = await getDocs(querySnapshot);

        const userData = querySnapshotData.docs[0].data() as UserProps;

        // console.log("User found successfully!");

        return userData;
    } catch (error) {
        console.error("Error getting user", error);
        return null;
    }
}


// get all users

export const getAllUsers = async () => {
    // console.log("Getting all users...");

    try {
        const usersRef = doc(db, "users");
        const docSnap = await getDoc(usersRef);

        const usersData = docSnap.data() as UserProps[];
        
        // console.log("Users found successfully!");

        return usersData;

    } catch (error) {
        console.error("Error getting users", error);
        return null;
    }
}

// update user profile

interface UpdateProfileProps {
    name: string;
    username: string;
    bio: string;
    website: string;
    image: File;
}




export const updateProfile = async (
    { name, username, bio, website, image }: UpdateProfileProps,
    user: UserProps
) => {
    
    // if (!name || !username || !bio || !website || !user ) {
    //     console.error("Missing required fields");
    //     return null;
    // }
    
    console.log("Updating user profile...");
    try {
        // const user = auth.currentUser;
        if (user) {
            // delete old profile image

            if (image) {
            const oldProfileImageRef = ref(storage, user.profileImage);
            await deleteObject(oldProfileImageRef);

            // upload new profile image

            const uploadRef = ref(storage, `images/profiles/${username}`);
            const uploaded = await uploadBytes(uploadRef, image as File);

            const profileImageUrl = await getDownloadURL(uploaded.ref);

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                username,
                bio,
                website,
                profileImage: image ? profileImageUrl : user.profileImage,
            }, { merge: true });

            // get updated user data

            const docSnap = await getDoc(userRef);

            const userData = docSnap.data() as UserProps;

            console.log("User profile updated successfully!");

            return userData;

        } else {

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                username,
                bio,
                website,
                profileImage: user.profileImage,
            }, { merge: true });

            // get updated user data

            const docSnap = await getDoc(userRef);

            const userData = docSnap.data() as UserProps;

            console.log("User profile updated successfully!");
            
            return userData;

        }
        }
    } catch (error) {
        console.error("Error updating user profile", error);
        return null;
    }
}
