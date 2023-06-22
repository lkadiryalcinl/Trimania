import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from 'react-native-flash-message'
import { getFirebaseAuthErrorMessage, getFirebaseFirestoreErrorMessage } from './error'

const findUserById = async(uid) => {

    const user = await firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then((user)=> {
        return user.data()       
    })
    
    return user
}

export default findUserById;