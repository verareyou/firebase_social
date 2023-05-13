import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CreatePostProps, PostModel } from "../models/PostModel";
import { db, storage } from "../config/firebase";
import { getDate } from "../utils/Operations";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import imageCompression from "browser-image-compression";


export const createPost = async ({image, caption, user}: CreatePostProps) => {
    if (!image || !user) return null;

    try {

        const compressImage = await imageCompression(image as File, {maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, maxIteration: 10, fileType: "image/jpeg"});
        
        const uploadRef = ref(storage, `images/posts/${user.username}/${user.username}-${getDate()}`);
        const uploaded = await uploadBytes(uploadRef, compressImage as File);

        const postImageUrl = await getDownloadURL(uploaded.ref);

        
        const postRef = doc(collection(db, "posts"));

        console.log(postRef.id);

        const postData: PostModel = {
            uid: postRef.id,
            imageUrls: [postImageUrl],
            caption,
            likes: [],
            comments: [],
            username: user.username,
            user: {
                uid: user.uid,
                profileImage: user.profileImage || ""
            },
            createdAt: getDate()
        }
        await setDoc(postRef, postData);

        const postDoc = await getDoc(postRef);

        // if (postDoc.exists()) {
        //     const post = postDoc.data();
        //     console.log(post);
        //     if (post) {
        //         return user;
        //     }
        // }
        
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData) {
                let Posts = userData.Posts;
                if(Posts) {
                Posts.push(postData);
                } else {
                    Posts = [postData];
                }
                await updateDoc(userRef, { Posts: Posts });

                const updatedUserDoc = await getDoc(userRef);

                const updatedUserData = updatedUserDoc.data();

                if (updatedUserData) {
                    return updatedUserData;
                }
            }
        } 

        return null;

    } catch (error) {
        console.log(error);
        return null;
    }

}
export const getAllPosts = async () => {
    try {
        const postsQuery = query(collection(db, "posts"));
        const posts = await getDocs(postsQuery);

        if (!posts.empty) {
            const postsData = posts.docs.map(post => post.data());
            return postsData;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserPosts = async (username: string) => {
    try {
        const postsQuery = query(collection(db, "posts"), where("username", "==", username));
        const posts = await getDocs(postsQuery);

        if (!posts.empty) {
            const postsData = posts.docs.map(post => post.data());
            return postsData;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}