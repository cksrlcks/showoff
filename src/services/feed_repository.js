import {
    getDatabase,
    set,
    ref,
    onValue,
    off,
    orderByKey,
    orderByChild,
    query,
    limitToLast,
    startAt,
    endAt,
    startAfter,
    limitToFirst
} from "firebase/database";

class PostRepository {
    constructor(app) {
        this.db = getDatabase(app);
        this.lastKey = '';
    }

    savePost(post) {
        set(ref(this.db, `/posts/${post.id}`), post);
    }

    syncPosts(onUpdate) {
        const postRef = query(ref(this.db, "posts"),  orderByChild('reverseCreatedAt'), limitToFirst(2));

        onValue(postRef, snapshot => {
            const value = snapshot.val();
            if(value){
                onUpdate(value);
                this.lastKey = -1 * Object.keys(value)[0]
            } 
        });

        return () => off(postRef);
    }

    loadMorePosts(onUpdate){
        const postRef = query(ref(this.db, "posts"), orderByChild('reverseCreatedAt'), startAfter(this.lastKey), limitToFirst(2));

        onValue(postRef, snapshot => {
            const value = snapshot.val();
            if(value){
                onUpdate(value);
                this.lastKey = -1 * Object.keys(value)[0]
            } 
        });

        return () => off(postRef);
    }

    removePost() {}
}

export default PostRepository;
