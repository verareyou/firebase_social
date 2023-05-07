
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ResizeFile } from "../utils/ResizeImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

// interface UpdateProfileProps {
//     name: string;
//     username: string;
//     bio: string;
//     website: string;
//     image: File;
// }

class UpdateProfile {
    name: string;
    username: string;
    bio: string;
    website: string;
    image: File;

    constructor({ name, username, bio, website, image }: UpdateProfile) {
        this.name = name;
        this.username = username;
        this.bio = bio;
        this.website = website;
        this.image = image;
    }

    async updateProfile(user: any) {
        console.log("Updating user profile...");

        if (!this.name || !this.username || !this.bio || !this.website || !this.image || !user) return null;

        try {
            // const user = auth.currentUser;
            if (user) {

                const resizeImage = await ResizeFile(this.image);

                // delete old profile image

                const oldProfileImageRef = ref(storage, user.profileImage);

                const uploadRef = ref(storage, `images/${user.uid}/profile.jpg`);
                const uploaded = await uploadBytes(uploadRef, resizeImage as File);

                const profileImageUrl = await getDownloadURL(uploaded.ref);

                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, {
                    name: this.name,
                    username: this.username,
                    bio: this.bio,
                    website: this.website,
                    profileImage: profileImageUrl,
                }, { merge: true });

                // get updated user data

                const docSnap = await getDoc(userRef);

                const userData = docSnap.data() as UserProps;

                console.log("User profile updated successfully!");

                return userData;
            }
        } catch (error) {
            console.error("Error updating user profile", error);
            return null;
        }
    }
}

export default UpdateProfile;


// export const updateProfile = async ({ name, username, bio, website, image }: UpdateProfileProps, user: any) => {
//     console.log("Updating user profile...");

//     if (!name || !username || !bio || !website || !image || !user) return null;

//     try {
//         // const user = auth.currentUser;
//         if (user) {

//             const resizeImage = await ResizeFile(image);

//             // delete old profile image

//             const oldProfileImageRef = ref(storage, user.profileImage);

//             const uploadRef = ref(storage, `images/${user.uid}/profile.jpg`);
//             const uploaded = await uploadBytes(uploadRef, resizeImage as File);

//             const profileImageUrl = await getDownloadURL(uploaded.ref);

//             const userRef = doc(db, "users", user.uid);
//             await setDoc(userRef, {
//                 name,
//                 username,
//                 bio,
//                 website,
//                 profileImage: profileImageUrl,
//             }, { merge: true });

//             // get updated user data

//             const docSnap = await getDoc(userRef);

//             const userData = docSnap.data() as UserProps;

//             console.log("User profile updated successfully!");
            
//             return userData;
//         }
//     } catch (error) {
//         console.error("Error updating user profile", error);
//         return null;
//     }
// }
