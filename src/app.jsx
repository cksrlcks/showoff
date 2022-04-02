import React, { useEffect, useState, useContext, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollTop";
import Feeds from "./components/feeds";
import MyPage from "./components/myPage/";
import Write from "./components/write";
import Login from "./components/login";
import SignUp from "./components/signUp";
import ResetPassword from "./components/resetPassword";
import Welcome from "./components/welcome";

const App = ({ authService, postRepository, imageUploader }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState({});
    const [loading, setLoading] = useState(true);

    //Auth & my posts count
    useEffect(() => {
        let stopSync;
        authService.onAuthChange(user => {
            if (!user) {
                setUser(null);
                return;
            }

            stopSync = postRepository.getUserData(user.uid, posts => {
                setUser({ ...user, myPostsLength: Object.keys(posts).length });
            });
        });

        return () => stopSync();
    }, [authService]);

    //Get All users Posts
    useEffect(() => {
        setLoading(true);
        const stopSync = postRepository.syncPosts(posts => {
            if (posts) {
                setPosts(posts);
            }

            setLoading(false);
        });

        return () => stopSync();
    }, [postRepository]);

    const loadMorePosts = () => {
        setLoading(true);
        const stopSync = postRepository.loadMorePosts(newPosts => {
            if (newPosts) {
                const updatedPosts = { ...posts, ...newPosts };
                setPosts(updatedPosts);
            }
            setLoading(false);
        });

        return () => stopSync();
    };

    const createPost = (post, userId) => {
        setPosts(posts => {
            const updatedPosts = { ...posts };
            updatedPosts[post.id] = post;
            return updatedPosts;
        });
        postRepository.savePost(post, userId);
    };

    const deletePost = (postId, userId, fileId) => {
        setPosts(posts => {
            const updatedPosts = { ...posts };
            delete updatedPosts[postId];
            return updatedPosts;
        });

        fileId && imageUploader.delete(fileId);
        postRepository.removePost(postId, userId);
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Feeds
                            loading={loading}
                            user={user}
                            posts={posts}
                            loadMorePosts={loadMorePosts}
                            deletePost={deletePost}
                        />
                    }
                />
                <Route
                    path="/write"
                    element={
                        <Write
                            user={user}
                            createPost={createPost}
                            imageUploader={imageUploader}
                        />
                    }
                />
                <Route
                    path="/my/*"
                    element={
                        <MyPage
                            authService={authService}
                            user={user}
                            postRepository={postRepository}
                            deletePost={deletePost}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={<Login authService={authService} />}
                />
                <Route
                    path="/signup"
                    element={<SignUp authService={authService} />}
                />
                <Route
                    path="/reset"
                    element={<ResetPassword authService={authService} />}
                />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
};

export default App;
