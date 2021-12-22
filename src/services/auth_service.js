import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";

class AuthService {
    constructor() {
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
        //this.githubProvider = new GithubAuthProvider();

        //구글 로그인시 반드시 계정을 선택하도록
        this.googleProvider.setCustomParameters({
            prompt: "select_account"
        });
    }

    async loginWithEmail(userData, onLogin) {
        try {
            await signInWithEmailAndPassword(
                this.firebaseAuth,
                userData.email,
                userData.password
            );
            onLogin("success");
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            onLogin("error", errorMessage);
        }
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

    async signUp(userData, onSignUp) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                this.firebaseAuth,
                userData.email,
                userData.password
            );

            const user = userCredential.user;

            await updateProfile(this.firebaseAuth.currentUser, {
                displayName: userData.displayName || ""
            });

            onSignUp("success", user);
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            onSignUp("fail", errorMessage);
        }
    }

    async sendRestEmail(userEmail, onSend) {
        try {
            await sendPasswordResetEmail(this.firebaseAuth, userEmail);
            onSend("success");
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            return onSend("fail", errorMessage);
        }
    }

    onAuthChange(onUserChanged) {
        this.firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }

    async setPersistence() {
        try {
            await setPersistence(this.firebaseAuth, browserSessionPersistence);

            return signInWithPopup(this.firebaseAuth, this.googleProvider);
        } catch (error) {}
    }

    getErrorMessage(error) {
        switch (error.code) {
            case "auth/wrong-password":
                return "비밀번호가 틀렸습니다.";
            case "auth/user-not-found":
                return "등록된 이메일 아닙니다.";
            case "auth/email-already-in-use":
                return "이미 사용중인 이메일입니다.";
            case "auth/invalid-email":
                return "이메일주소가 잘못되었습니다.";
            default:
                throw new Error(
                    `알수없는 에러입니다. = ${error.code} : ${error.errorMessage}`
                );
        }
    }
}

export default AuthService;
