import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { checkingCredentials, login, logout } from '../store/auth/authSlice';
import { loadingNotes } from '../store/dashboard/thunks';


export const useAuthStateChanged = () => {

    const { status } = useSelector(state => state.auth);

    const dispatch = useDispatch();



    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());


            const { uid, email, displayName, photoURL } = user;


            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(loadingNotes())

        })
    }, []);

    return status


}

