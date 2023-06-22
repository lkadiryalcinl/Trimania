import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message'
import { getFirebaseAuthErrorMessage } from './error'

const signInUser = (data) => {

    auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .catch(err => {
            const message = getFirebaseAuthErrorMessage(err)
            showMessage({
                message,
                type: 'warning'
            })
        })

}

export default signInUser;