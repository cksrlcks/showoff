import React, { useEffect, useState, useContext, createContext } from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import ScrollToTop from "./components/scrollTop";
import Feeds from "./components/feeds";
import MyPage from "./components/myPage";
import Write from "./components/write";
import Login from "./components/login";
import SignUp from "./components/signUp";
import ResetPassword from "./components/resetPassword";
import Welcome from "./components/welcome";

const App = ({ authService, postRepository, imageUploader }) => {
    const [user, setUser] = useState(null);
    const [myPosts, setMyPosts] = useState({});
    const [posts, setPosts] = useState({});
    const [loading, setLoading] = useState(true);

    //Get All Posts
    useEffect(() => {
        setLoading(true);
        const stopSync = postRepository.syncPosts(posts => {
            if (posts) {
                setPosts(posts);
            }

            setLoading(false);
        });

        return () => stopSync();
    }, [postRepository, user]);

    //Get one user Posts
    useEffect(() => {
        if (!user) return;
        const stopSync = postRepository.getUserData(user.uid, posts => {
            if (posts) {
                setMyPosts(posts);
            }
        });

        return () => stopSync();
    }, [postRepository, user]);

    const createPost = (post, userId) => {
        setPosts(posts => {
            const updatedPosts = { ...posts };
            updatedPosts[post.id] = post;
            return updatedPosts;
        });
        postRepository.savePost(post, userId);
    };

    const loadMorePosts = () => {
        setLoading(true);
        const stopSync = postRepository.loadMorePosts(newPosts => {
            if (newPosts) {
                const updatedPosts = { ...posts, ...newPosts };
                setPosts(updatedPosts);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });

        return () => stopSync();
    };

    const deletePost = (postId, userId, fileId) => {
        setPosts(posts => {
            const updatedPosts = { ...posts };
            delete updatedPosts[postId];
            return updatedPosts;
        });

        setMyPosts(posts => {
            const updatedPosts = { ...posts };
            delete updatedPosts[postId];
            return updatedPosts;
        });

        fileId && imageUploader.delete(fileId);
        postRepository.removePost(postId, userId);
    };

    //Auth
    useEffect(() => {
        authService.onAuthChange(user => {
            setUser(user);
        });
    }, [authService, user]);

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
                            myPosts={myPosts}
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
                    path="/my"
                    element={
                        <MyPage
                            authService={authService}
                            user={user}
                            myPosts={myPosts}
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
