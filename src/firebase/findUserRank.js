import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const findUserRank = async() => {

    const users = await firestore().collection('Users').orderBy('score','desc').limit(20).get()
    let usersList = users.docs.map(doc => doc.id === auth().currentUser.uid)
    return usersList.findIndex(element => element === true) +1
}

export default findUserRank;