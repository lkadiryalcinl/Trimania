import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'
import {getFirebaseAuthErrorMessage,getFirebaseFirestoreErrorMessage} from './error'

const createUser = async (data) => {
    try {
        await auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                userCredential.user.sendEmailVerification()
                firestore().collection('Users').doc(userCredential.user.uid).set({
                    username: data.username,
                    icon: 1,
                    userID: userCredential.user.uid
                });
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
    }
}

const forgotPassword = async function forgotPassword(email) {
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        console.log(error);
    }
}

const signInUser = (data) => {

    auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .catch(err => {
            showMessage({
                message:getFirebaseAuthErrorMessage(err.code),
                type:'warning'
            })
        })

}

export {
    createUser,
    forgotPassword,
    signInUser
}