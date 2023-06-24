import firestore from '@react-native-firebase/firestore'

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