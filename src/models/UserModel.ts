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
    Posts: string[];
}
