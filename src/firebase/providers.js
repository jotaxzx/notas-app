import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerEmailPassword = async ({ displayName, email, password }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;
        //Actualzar displayName en firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })
        console.log(resp)


        return {
            ok: true,
            uid,
            email,
            photoURL,
            displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }

    }
}

export const loginEmailPassword = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid,
            email,
            photoURL,
            displayName

        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {

    await FirebaseAuth.signOut();

}