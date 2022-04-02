import React, { useEffect, useState } from "react";
import SubPage from "../subPage";
import Post from "../post";
import LoadingSpinner from "../loadingSpinner";

const MyPosts = ({ user, postRepository, deletePost }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState({});

    useEffect(() => {
        setLoading(true);
        const stopSync = postRepository.getUserPosts(user.uid, newPosts => {
            if (newPosts) {
                const updatedPosts = { ...posts, ...newPosts };
                setPosts(updatedPosts);
            }
            setLoading(false);
        });
        return () => stopSync();
    }, []);

    return (
        <SubPage title="내가 작성한 글">
            {loading && <LoadingSpinner />}
            {Object.keys(posts)
                .sort()
                .reverse()
                .map(key => {
                    return (
                        <Post
                            key={key}
                            post={posts[key]}
                            user={user}
                            deletePost={deletePost.bind(
                                null,
                                posts[key].id,
                                posts[key].userId,
                                posts[key].fileId
                            )}
                        />
                    );
                })}
        </SubPage>
    );
};

export default MyPosts;
