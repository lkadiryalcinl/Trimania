import auth from '@react-native-firebase/auth';

async function forgotPassword(email) {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    console.log(error);
  }
}

export default forgotPassword