import { airState, combineAirState } from 'react-air-state';

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export type User = {
    id: number;
    name: string;
    username: string;
};

export type NormalizePost = {
    id: number;
    title: string;
    username: string;
    commentsCount: number;
};

export const postsState = airState<Post[] | null>(null);
export const usersState = airState<User[] | null>(null);
export const commentsState = airState<Comment[] | null>(null);

export const normalizePosts = combineAirState([postsState, usersState, commentsState] as const, (posts, users, comments) => {
    if (!(posts && users && comments)) {
        return [] as NormalizePost[];
    }

    return posts.map<NormalizePost>((post) => {
        const currentUser = users.find((user) => user.id === post.userId);

        return {
            id: post.id,
            title: post.title,
            username: currentUser?.username ?? "",
            commentsCount: comments.filter((comment) => comment.postId === post.id).length
        };
    });
});
