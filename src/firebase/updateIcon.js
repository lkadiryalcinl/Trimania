import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const updateIcon = async(newIconValue) => {
    firestore().collection('Users').doc(auth().currentUser.uid).update({
        icon:newIconValue
    }).then(() => {
    })
}

export default updateIcon
