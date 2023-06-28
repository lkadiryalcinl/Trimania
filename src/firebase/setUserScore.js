import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { getFirebaseFirestoreErrorMessage } from './error'
const setUserScore = (score) => {

    firestore().collection('Users').doc(auth().currentUser?.uid).update({
        score,
    }).then(() => {

    }).catch(err => {
        const message = getFirebaseFirestoreErrorMessage(err.code)
        showMessage({
            message,
            type: 'warning'
        })
    })
}

export default setUserScore