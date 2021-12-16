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

const App = ({ authService, postRepository }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState({});

    useEffect(() => {
        if (!user) return;

        const stopSync = postRepository.syncPosts(posts => {
            setPosts(posts);
        });

        return () => stopSync();
    }, [postRepository, user]);

    useEffect(() => {
        authService.onAuthChange(user => {
            setUser(user);
        });
    }, [authService, user]);

    const createPost = post => {
        setPosts(posts => {
            const updatedPosts = { ...posts };
            updatedPosts[post.id] = post;
            return updatedPosts;
        });
        postRepository.savePost(post);
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Feeds posts={posts} />} />
                <Route
                    path="/write"
                    element={<Write user={user} createPost={createPost} />}
                />
                <Route
                    path="/my"
                    element={<MyPage authService={authService} user={user} />}
                />
                <Route
                    path="/login"
                    element={<Login authService={authService} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
