import { FetchPostProps } from "../models/PostModel"
import { FetchUserProps } from "../models/UserModel"
import { getUserByUid, getUserByUsername } from "../services/User"


export const NavigateProfile = async (username: string, user: any, navigate: any) => {
    if (username === user.username) {
        navigate(`/${user.username}`, { state: { displayUser: user, CurrentUser: true } }) 
        } else {
        const res = await getUserByUsername(username)
        console.log(res)
        if (res === null) {
            navigate('/404')
            return
        }
        navigate(`/${res.username}`, { state: { displayUser: res, CurrentUser: false } })
    }
}


export const getUserProfile = async (username: string,CurrentUser: any ,setUser: any, setCurrent: any) => {
    const res = await getUserByUsername(username)
    if (res === null) {
        return
    }
    if (CurrentUser === username) {
        setUser(res)
        setCurrent(true)
    }
    else {
        setUser(res)
        setCurrent(false)
    }
}

export const getDate = () => {
    const date = new Date();
        const todaydate = date.toISOString().slice(0, 10);
        const hour = date.getHours();
        const minute = date.getMinutes();

        const fulldate = todaydate + " " + hour + ":" + minute;

        return fulldate;
}


export const sortPostsByTime = (posts: any) => {
    const copyPosts = [...posts];
    const sortedPosts = copyPosts.sort((a: any, b: any) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();

        return bDate - aDate;
    })

    return sortedPosts;
}

export const randomEmoji = () => {
    const emojis = ["😈", "🥴", "😒", "👾", "💩"]
    const random = Math.floor(Math.random() * emojis.length)
    return emojis[random]
}

// an array of posts to two different arrays of posts by even and odd index

export const splitPosts =  (posts: any) => {
    const even = [];
    const odd = [];
    for (let i = 0; i < posts.length; i++) {
        if (i % 2 === 0) {
            even.push(posts[i])
        } else {
            odd.push(posts[i])
        }
    }
    return [ even, odd]
}

export const getFetchPostData = ( post: any, user: any ) => {
    const fetchPostData: FetchPostProps = {
        uid: post.uid,
        username: user.username,
        imageUrls: post.imageUrls,
        caption: post.caption,
        likes: post.likes ? post.likes : [],
        comments: post.comments,
        createdAt: post.createdAt,
        user: {
            user_uid: user.uid,
            username: user.username,
            profileImage: user.profileImage
        }
    }

    return fetchPostData;
}

export const getFetchUserData = (user: any, posts: any) => {
    const fetchUserData: FetchUserProps = {
        uid: user.uid,
        email: user.email,
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        bio: user.bio,
        website: user.website,
        Followers: user.Followers,
        Following: user.Following,
        Posts: posts,
    }

    return fetchUserData;
}
