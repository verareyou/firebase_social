import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../config/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ResizeFile } from "../utils/ResizeImage";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/Slice";
import { string } from "yup";


// register and create user

interface RegisterProps {
    name: string;
    username: string;
    email: string;
    password: string;
    image: File;
}

interface UserProps {
    uid: string;
    email: string;
    name: string;
    username: string;
    profileImage?: string;
    createdAt: number;
    bio: string;
    website: string;
    Followers: string[];
    Following: string[];
    Posts: string[];
}

export const register = async ({ name, username, email, password, image }: RegisterProps) => {
    console.log("Registering user...");

    console.log(name, username, email, password, image);

    if (!name || !username || !email || !password || !image) return null;

    try {

        const res = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = res;

        if (user) {

            const resizeImage = await ResizeFile(image);
            
            const uploadRef = ref(storage, `images/${user.uid}/profile.jpg`);
            const uploaded = await uploadBytes(uploadRef, resizeImage as File);

            const profileImageUrl = await getDownloadURL(uploaded.ref);
            
            const userData: UserProps = {
                uid: user.uid,
                email,
                name,
                username,
                profileImage: profileImageUrl,
                bio: "",
                website: "",
                Followers: [],
                Following: [],
                Posts: [],
                createdAt: Date.now(),
            };
            const createUserRef = doc(collection(db, "users"), user.uid);
            await setDoc(createUserRef, userData);

            console.log("User created successfully!");

            return userData;
        }
    } catch (error) {
        console.error("Error creating user", error);
        return null;
    }
}

// login user

export const login = async ({ email, password }: { email: string; password: string }) => {
    console.log("Logging in user...");

    if (!email || !password) return null;

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const { user } = res;

        if (user) {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            const userData = docSnap.data() as UserProps;

            console.log("User logged in successfully!");

            return userData;
        }
    } catch (error) {
        console.error("Error logging in user", error);
        return null;
    }
}

// logout user

export const logout = async () => {
    console.log("Logging out user...");

    try {
        await signOut(auth);
        console.log("User logged out successfully!");
        return true;
    } catch (error) {
        console.error("Error logging out user", error);
        return null;
    }
}

// sign in with google

export const signInWithGoogle = async () => {
    try{
        const provider = new GoogleAuthProvider();
        
        const res = await signInWithPopup(auth, provider);

        const { user } = res;

        if (user) {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {

                const userData: UserProps = {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    username: user.displayName,
                    profileImage: user.photoURL,
                    bio: "",
                    website: "",
                    Followers: [],
                    Following: [],
                    Posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(userRef, userData);
            }

            const userData = docSnap.data() as UserProps;

            console.log("User logged in successfully!");

            const dispatch = useDispatch();
            dispatch(
                SetUser(userData)
            );
            dispatch(
                SetAuth(true)
            );

            return userData;
        }
    } catch (error) {
        console.error("Error logging in user", error);
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

export const updateProfile = async ({ name, username, bio, website, image }: UpdateProfileProps, user: any) => {
    console.log("Updating user profile...");

    if (!name || !username || !bio || !website || !image || !user) return null;

    try {
        // const user = auth.currentUser;
        if (user) {

            const resizeImage = await ResizeFile(image);

            // delete old profile image
            
            const oldProfileImageRef = ref(storage, user.profileImage);
            
            const uploadRef = ref(storage, `images/${user.uid}/profile.jpg`);
            const uploaded = await uploadBytes(uploadRef, resizeImage as File);

            const profileImageUrl = await getDownloadURL(uploaded.ref);

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                username,
                bio,
                website,
                profileImage: profileImageUrl,
            }, { merge: true });

            console.log("User profile updated successfully!");

            const dispatch = useDispatch();
            dispatch(
                SetUser({ ...user, name, username, bio, website, profileImage: uploadRef.fullPath })
            );

            return true;
        }
    } catch (error) {
        console.error("Error updating user profile", error);
        return null;
    }
}