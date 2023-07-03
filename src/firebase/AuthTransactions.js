import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'
import {getFirebaseAuthErrorMessage,getFirebaseFirestoreErrorMessage} from './error'
import { useContext } from 'react'
import { Context } from '../context/Context'

const createUser = async (data,setLoading) => {
    try {
        setLoading(true)
        await auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                userCredential.user.sendEmailVerification()
                firestore().collection('Users').doc(userCredential.user.uid).set({
                    username: data.username,
                    icon: 1,
                    userID: userCredential.user.uid
                });
                setLoading(false)
            })

    } catch (err) {
        let message = '';
        if (err.code && err.code.startsWith('auth/')) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseAuthErrorMessage(err.code);
        } else if (err.code) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseFirestoreErrorMessage(err.code);
        }
        else {
            message = "Unknown error is encountered."
        }
        showMessage({
            message,
            type: 'warning'
        })
        setLoading(false)
    }
}

const forgotPassword = async function forgotPassword(email) {
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        console.log(error);
    }
}

const signInUser = (data,setLoading) => {
    try {
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                setLoading(false)
            })
    } catch (err) {
        let message = '';
        if (err.code && err.code.startsWith('auth/')) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseAuthErrorMessage(err.code);
        } else if (err.code) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseFirestoreErrorMessage(err.code);
        }
        else {
            message = "Unknown error is encountered."
        }
        showMessage({
            message,
            type: 'warning'
        })
        setLoading(false)
    }
}

export {
    createUser,
    forgotPassword,
    signInUser
}