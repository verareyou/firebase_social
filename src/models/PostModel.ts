
import { UserProps } from "./UserModel";

export interface LikeModel {
    user_id: string;
    username: string;
    profileImage?: string;
    createdAt: string;
}

export interface CommentModel {
    user_id: string;
    username: string;
    profileImage?: string;
    comment: string;
    createdAt: string;
}

export interface PostModel {
    uid: string;
    imageUrls: string[];
    caption: string;
    likes: LikeModel[];
    comments: CommentModel[];
    user_uid: string;
    createdAt: string;
}

export interface FetchPostProps {
    uid: string;
    username: string;
    imageUrls: string[];
    caption: string;
    likes: LikeModel[];
    comments: CommentModel[];
    createdAt: string;
    user:{
        user_uid: string;
        username: string;
        profileImage?: string;
    }
}

export interface CreatePostProps {
    image: File;
    caption: string;
    user: UserProps;
}