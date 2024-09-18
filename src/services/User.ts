
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FetchUserProps, UpdateProfileProps, UserProps } from "../models/UserModel";
import { getFetchUserData } from "../utils/Operations";

// get user by uid

export const getUserByUid = async (uid: string) => {
    if (!uid) return null;

    try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);

        const userData = docSnap.data() as UserProps;

        return userData;
    } catch (error) {
        console.error("Error getting user", error);
        return null;
    }
}

export const getUsersByUids = async (uids: string[]) => {
    if (!uids) return null;

    try {

        const usersQuerySnapshot = query(collection(db, "users"), where("uid", "in", uids));
        const usersQuerySnapshotData = await getDocs(usersQuerySnapshot);

        const usersData = usersQuerySnapshotData.docs.map(doc => doc.data());

        return usersData;
    } catch (error) {
        console.error("Error getting users", error);
        return null;
    }
}

// get my subscribers

export const getMySubscribers = async (uid: string) => {


    console.log("Getting subscribers...", uid);

    try {
        const querySnapshot = query(collection(db, "users"), where("subscribedTo", "array-contains", uid));
        const querySnapshotData = await getDocs(querySnapshot);

        const subscribersData = querySnapshotData.docs.map(doc => doc.data());

        return subscribersData;
    } catch (error) {
        console.error("Error getting subscribers", error);
        return null;
    }
}

// get my subscriptions

export const getMySubscriptions = async () => {

    const uid = auth.currentUser?.uid;

    try {
        const querySnapshot = query(collection(db, "users"), where("subscribers", "array-contains", uid));
        const querySnapshotData = await getDocs(querySnapshot);

        const subscriptionsData = querySnapshotData.docs.map(doc => doc.data());

        console.log("Subscriptions data", subscriptionsData);

        return subscriptionsData;
    } catch (error) {
        console.error("Error getting subscriptions", error);
        return null;
    }
}

// get user by username

export const getUserByUsername = async (username: string) => {

    if (!username) return null;

    console.log("Getting user...");

    try {
        const querySnapshot = query(collection(db, "users"), where("username", "==", username));
        const querySnapshotData = await getDocs(querySnapshot);

        if (querySnapshotData.empty) return null;

        const userData = querySnapshotData.docs[0].data();

        const postsQuerySnapshot = query(collection(db, "posts"), where("user_uid", "==", userData.uid));
        const postsQuerySnapshotData = await getDocs(postsQuerySnapshot);

        const postsData = postsQuerySnapshotData.docs.map(doc => doc.data());

        !postsData && console.log("No posts found!");

        // get user data with posts

        const fetchUserData = getFetchUserData(userData, postsData);

        return fetchUserData;
    } catch (error) {
        console.error("Error getting user", error);
        return null;
    }
}

// get all users

export const getAllUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => doc.data());

        return usersData;

    } catch (error) {
        console.error("Error getting users", error);
        return null;
    }
}

// update user profile

export const updateProfile = async (
    { name, username, bio, website, image }: UpdateProfileProps,
    user: UserProps
) => {

    console.log("Updating user profile...");
    try {
        if (user) {

            const querySnapshot = query(collection(db, "users"), where("username", "==", username));
            const querySnapshotData = await getDocs(querySnapshot);

            const userData = querySnapshotData.docs[0].data() as UserProps;

            if (userData && userData.uid !== user.uid) {
                console.error("Username already taken!");
                return null;
            }

            if (image) {
                // const oldProfileImageRef = ref(storage, user.profileImage);
                // await deleteObject(oldProfileImageRef);

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
