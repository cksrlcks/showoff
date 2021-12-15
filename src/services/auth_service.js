import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

class AuthService {
    constructor() {
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
    }

    login() {
        return signInWithPopup(this.firebaseAuth, this.googleProvider);
    }

    logout() {
        this.firebaseAuth.signOut();
    }

    onAuthChange(onUserChanged) {
        this.firebaseAuth.onAuthStateChanged((user) => {
            onUserChanged(user);
        });
    }
}

export default AuthService;
