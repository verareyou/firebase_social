import { PostModel } from "./PostModel";


export interface FollowModel {
    user: { user_id: string, username: string, profileImage?: string };
    createdAt: number;
}

export interface UpdateProfileProps {
    name: string;
    username: string;
    bio: string;
    website: string;
    image: File;
}

export interface RegisterProps {
    name: string;
    username: string;
    email: string;
    password: string;
    image: File;
}

export interface UserProps {
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
    Posts: any[];
}

export interface FetchUserProps {
    uid: string;
    email: string;
    name: string;
    username: string;
    profileImage?: string;
    createdAt: number;
    bio: string;
    website: string;
    Followers: any[],
    Following: any[],
    Posts: any[];
}
