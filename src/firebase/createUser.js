import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'
import { getFirebaseAuthErrorMessage, getFirebaseFirestoreErrorMessage } from './error'

const createUser = (data) => {
    
    auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
            firestore().collection('Users').doc(auth().currentUser?.uid).set({
                username: data.username,
                score: 0,
            }).then(() => {
                console.log('collection updated successfully')
            }).catch(err => {
                const message = getFirebaseFirestoreErrorMessage(err)
                showMessage({
                    message,
                    type: 'warning'
                })
            })
        }).catch(err => {
            const message = getFirebaseAuthErrorMessage(err)
            showMessage({
                message,
                type: 'warning'
            })
        })

}



export default createUser;