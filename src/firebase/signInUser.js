import auth from '@react-native-firebase/auth'
import { getFirebaseAuthErrorMessage } from './error';
import { showMessage } from 'react-native-flash-message';

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

export default signInUser;