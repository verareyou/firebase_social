
import { UserProps } from "./UserModel";

export interface LikeModel {
    user: { user_id: string, username: string, profileImage?: string };
    createdAt: string;
}

export interface CommentModel {
    user: { user_id: string, username: string, profileImage?: string };
    comment: string;
    createdAt: string;
}

export interface PostModel {
    uid: string;
    imageUrls: string[];
    caption: string;
    likes: LikeModel[];
    comments: CommentModel[];
    username: string;
    user: { 
        uid: string,
         profileImage: string };
    createdAt: string;
}

export interface CreatePostProps {
    image: File;
    caption: string;
    user: UserProps;
}