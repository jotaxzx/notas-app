import { loginEmailPassword, logoutFirebase, registerEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../dashboard/dashboardSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogle = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))

        // console.log({result});
    }
}

export const startEmailPassword = ({ displayName, email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { photoURL, uid, ok, errorMessage } = await registerEmailPassword({ displayName, email, password });

        !ok ? dispatch(logout({ errorMessage })) : dispatch(login({ uid, displayName, email, photoURL }))

    }
}

export const startLogin = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { photoURL, uid, ok, errorMessage, displayName } = await loginEmailPassword({ email, password })
        // const resp = await loginEmailPassword({email, password})


        !ok ? dispatch(logout({ errorMessage })) : dispatch(login({ uid, displayName, email, photoURL }))
    }
}

export const startLogout = () => {

    return async (dispatch) => {

        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout())
    }
}