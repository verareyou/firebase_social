import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CreatePostProps, FetchPostProps, PostModel } from "../models/PostModel";
import { db, storage } from "../config/firebase";
import { getDate, getFetchPostData } from "../utils/Operations";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { getUserByUid, getUserByUsername } from "./User";


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
            user_uid: user.uid,
            createdAt: getDate()
        }
        await setDoc(postRef, postData);

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        // update user posts

        if (userDoc.exists()) {

            const userData = userDoc.data();
            if (userData) {
                let Posts = userData.Posts;
                if(Posts) {
                Posts.push(postData.uid);
                } else {
                    Posts = [postData.uid];
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
            const postsWithUser = await Promise.all(postsData.map(async postData => {
                const userRef = doc(db, "users", postData.user_uid);
                const userData = await getDoc(userRef).then(doc => doc.data());

                if(!userData) return null;
                
                const fetchPostData = getFetchPostData(postData, userData);

                return fetchPostData;
            }));

            return postsWithUser;
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllPostsIds = async () => {
    try {
        const postsQuery = query(collection(db, "posts"));
        const posts = await getDocs(postsQuery);

        if (!posts.empty) {
            const postsData = posts.docs.map(post => {
                return { id : post.id,
                createdAt: post.data().createdAt }
            });
            return postsData;
        }

        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPostById = async (post_uid: string) => {
    try {
        const postRef = doc(db, "posts", post_uid);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
            const postData = postDoc.data();
            if (postData) {
                const userRef = doc(db, "users", postData.user_uid);
                const userData = await getDoc(userRef).then(doc => doc.data());

                if(!userData) return null;


                const post = getFetchPostData(postData, userData);
                return post;
            }
        }

        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const likePost = async (post_uid: string, user: any) => {
    try {

        const postRef = doc(db, "posts", post_uid);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
            const postData = postDoc.data();

            const checkLike = postData?.likes.find((like: any) => like.user_id === user.uid);

            if (checkLike) {
                const likes = postData?.likes.filter((like: any) => like.user_id !== user.uid);
                await updateDoc(postRef, { likes: likes });

                const updatedPostDoc = await getDoc(postRef);

                const updatedPostData = updatedPostDoc.data();
                

                if (updatedPostData) {
                    return updatedPostData;
                }
            }

            const like = {
                user_id: user.uid,
                username: user.username,
                profileImage: user.profileImage,
                createdAt: getDate()
            }

            if (postData) {
                let likes = postData.likes;
                if(likes) {
                    likes.push(like);
                } else {
                    likes = [like];
                }
                await updateDoc(postRef, { likes: likes });

                const updatedPostDoc = await getDoc(postRef);

                const updatedPostData = updatedPostDoc.data();


                if (updatedPostData) {
                    return getFetchPostData(updatedPostData, user);
                }
            }
        } 
        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editCaption = async (post_uid: string, caption: string) => {
    try {
        
        const postRef = doc(db, "posts", post_uid);
        await updateDoc(postRef, { caption: caption });

        const updatedPostDoc = await getDoc(postRef);

        const updatedPostData = updatedPostDoc.data();

        console.log(updatedPostData);

        const getUser = await getUserByUid(updatedPostData!.user_uid);

        console.log(getUser);

        const fetchPostData = getFetchPostData(updatedPostDoc.data(), getUser);

        if (fetchPostData) {
            return fetchPostData;
        }

        return null;

    } catch (error) {
        console.log(error);
        return null;
    }
}

