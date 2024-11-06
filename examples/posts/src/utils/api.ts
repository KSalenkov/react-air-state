import { Post, User, Comment, postsState, usersState, commentsState } from '../store/states';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

type FetchOptions = {
    signal: AbortSignal;
};

export const api = async <T>(url: string, options: FetchOptions) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        signal: options.signal
    });
    return (await response.json()) as T;
};

export const initPosts = async (options: FetchOptions) => {
    try {
        const posts = await api<Post[]>('/posts', options);
        postsState.dispatch(posts);
    } catch (error) {
        console.error(error);
    }
};

export const initUsers = async (options: FetchOptions) => {
    try {
        const users = await api<User[]>('/users', options);
        usersState.dispatch(users);
    } catch (error) {
        console.error(error);
    }
};

export const initComments = async (options: FetchOptions) => {
    try {
        const comments = await api<Comment[]>('/comments', options);
        commentsState.dispatch(comments);
    } catch (error) {
        console.error(error);
    }
};

export const init = (options: FetchOptions) => {
    initPosts(options);
    initUsers(options);
    initComments(options);
};
