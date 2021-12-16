import {
    getDatabase,
    set,
    ref,
    onValue,
    off,
    orderByKey,
    query,
    limitToLast
} from "firebase/database";

class PostRepository {
    constructor(app) {
        this.db = getDatabase(app);
    }

    savePost(post) {
        set(ref(this.db, `/posts/${post.id}`), post);
    }

    syncPosts(onUpdate) {
        const postRef = query(ref(this.db, "posts"), limitToLast(5));

        onValue(postRef, snapshot => {
            const value = snapshot.val();
            console.log(value);
            value && onUpdate(value);
        });

        return () => off(postRef);
    }

    removePost() {}
}

export default PostRepository;
