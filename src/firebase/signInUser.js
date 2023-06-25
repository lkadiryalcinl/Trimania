import auth from '@react-native-firebase/auth'
import { View,Text } from 'react-native';

import { getFirebaseAuthErrorMessage } from './error';

const signInUser = (data) => {

    auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .catch(err => {
                        
        })

}

export default signInUser;