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

const findUserRank = async() => {

    const users = await firestore().collection('Users').orderBy('score','desc').limit(20).get()
    let usersList = users.docs.map(doc => doc.id === auth().currentUser.uid)
    return usersList.findIndex(element => element === true) +1
}

const getAllUsers = async() => {

    const users = await firestore().collection('Users').orderBy('score','desc').limit(50).get()
    let usersList = users.docs.map(doc => doc.data())
    return usersList
}

const updateIcon = async(newIconValue) => {
    firestore().collection('Users').doc(auth().currentUser.uid).update({
        icon:newIconValue
    }).then(() => {
    })
}


export {
    findUserById,
    setUserScore,
    findUserRank,
    getAllUsers,
    updateIcon
}