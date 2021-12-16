import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth";

class AuthService {
    constructor() {
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();

        //구글 로그인신 반드시 계정을 선택하도록
        this.googleProvider.setCustomParameters({
            prompt: "select_account"
        });
    }

    login() {
        return signInWithPopup(this.firebaseAuth, this.googleProvider);
    }

    logout() {
        this.firebaseAuth.signOut();
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
}

export default AuthService;
