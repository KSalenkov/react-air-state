import React from 'react';
import { normalizePosts } from '../store/states';
import { Post } from './Post';

export const Posts: React.FC = () => {
    const posts = normalizePosts.useValue();

    return (
        <div className="posts_container">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};
