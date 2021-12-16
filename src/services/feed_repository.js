import {
    getDatabase,
    set,
    ref,
    onValue,
    off,
    orderByKey,
    query,
    limit
} from "firebase/database";

class PostRepository {
    constructor(app) {
        this.db = getDatabase(app);
    }

    savePost(post) {
        set(ref(this.db, `/posts/${post.id}`), post);
    }

    syncPosts(onUpdate) {
        const postRef = query(
            ref(this.db, "posts"),
            orderByKey("reverseCreatedAt", "desc")
        );

        onValue(postRef, snapshot => {
            const value = snapshot.val();
            value && onUpdate(value);
        });

        return () => off(postRef);
    }

    removePost() {}
}

export default PostRepository;
