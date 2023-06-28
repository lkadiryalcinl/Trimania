import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'
import { getFirebaseAuthErrorMessage, getFirebaseFirestoreErrorMessage } from './error'

const createUser = async (data) => { 
    try {
        await auth().createUserWithEmailAndPassword(data.email, data.password); 
        await firestore().collection('Users').doc(auth().currentUser?.uid).set({ 
            username: data.username,
            icon: 1,
            userID:auth().currentUser.uid
        });
        console.log('User created and collection updated successfully');
    } catch(err) {
        let message;
        if (err.code && err.code.startsWith('auth/')) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseAuthErrorMessage(err.code);
        } else if (err.code) {  // err.code var olduğunu kontrol ediyoruz
            message = getFirebaseFirestoreErrorMessage(err.code);
        } else {
            message = "An unknown error has occurred";
        }
        showMessage({
            message,
            type: 'warning'
        });
    }
}





export default createUser;