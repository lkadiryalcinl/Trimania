import firestore from '@react-native-firebase/firestore'

const getAllUsers = async() => {

    const users = await firestore().collection('Users').orderBy('score','desc').limit(50).get()
    let usersList = users.docs.map(doc => doc.data())
    return usersList
}

export default getAllUsers;