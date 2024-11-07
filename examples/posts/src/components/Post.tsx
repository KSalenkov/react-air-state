import React from 'react';
import { NormalizePost } from '../store/states';

interface PostProps {
    post: NormalizePost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.title}</h3>

            <p>by {post.username}</p>

            <p>Comments count: {post.commentsCount}</p>
        </div>
    );
};
