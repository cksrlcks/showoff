import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getDatabase,
    set,
    ref,
    onValue,
    off,
    orderByChild,
    query,
    startAfter,
    limitToFirst,
    remove
} from "firebase/database";

class AuthService {
    constructor(app) {
        this.db = getDatabase(app);
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
        //this.githubProvider = new GithubAuthProvider();

        //구글 로그인시 반드시 계정을 선택하도록
        this.googleProvider.setCustomParameters({
            prompt: "select_account"
        });
    }

    loginWithEmail(userData) {
        return signInWithEmailAndPassword(
            this.firebaseAuth,
            userData.email,
            userData.password
        );
    }

    loginWithProvider(provider) {
        const authProvider = this.getProvider(provider);
        return signInWithPopup(this.firebaseAuth, authProvider);
    }

    getProvider(provider) {
        switch (provider) {
            case "google":
                return this.googleProvider;
            //case "Github":
            //    return this.githubProvider;
            default:
                throw new Error(`지원하지않는 제공자입니다.: ${provider}`);
        }
    }

    logout() {
        this.firebaseAuth.signOut();
    }

    signUp(userData, callback) {
        console.log(userData);
        createUserWithEmailAndPassword(
            this.firebaseAuth,
            userData.email,
            userData.password
        )
            .then(userCredential => {
                const user = userCredential.user;
                const userDb = {
                    id: user.uid,
                    email: userData.email,
                    displayName: userData.displayName || ""
                };
                this.setUserProfile(userDb).then(() => callback(user));
            })
            .catch(error => {
                const errorMessage = this.getErrorMessage(error);
                alert(errorMessage);
            });
    }

    async setUserProfile(userDb) {
        await set(ref(this.db, `/users/${userDb.id}`), userDb);
    }

    onAuthChange(onUserChanged) {
        this.firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }

    setPersistence() {
        setPersistence(this.firebaseAuth, browserSessionPersistence)
            .then(() => {
                return signInWithPopup(this.firebaseAuth, this.googleProvider);
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    getErrorMessage(error) {
        switch (error.code) {
            case "auth/email-already-in-use":
                return "이미 사용중인 이메일입니다.";
            default:
                throw new Error(
                    `알수없는 에러입니다. = ${error.code} : ${error.errorMessage}`
                );
        }
    }
}

export default AuthService;
