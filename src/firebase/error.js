function getFirebaseAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-disabled':
      return 'User account has been disabled.';
    case 'auth/user-not-found':
      return 'User account not found.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'This email address is already in use.';
    case 'auth/operation-not-allowed':
      return 'This operation is not yet active.';
    case 'auth/weak-password':
      return 'Weak password. The password must be at least 6 characters long.';
    case 'auth/missing-verification-code':
      return 'Missing verification code.';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code.';
    case 'auth/code-expired':
      return 'Verification code has expired. Please request a new code.';
    case 'auth/popup-closed-by-user':
      return 'Operation canceled by user.';
    case 'auth/network-request-failed':
      return 'There is a problem with your internet connection. Please check your connection.';
    default:
      return 'An error occurred. Please try again later.';
  }
}

function getFirebaseFirestoreErrorMessage(error) {
  switch (error.code) {
    case "firebase/firestore":
      return "Firebase Firestore Error";
    case "firebase/firestore-network":
      return "Firebase Firestore Network Error";
    case "firebase/firestore-permission-denied":
      return "Firebase Firestore Permission Denied";
    case "firebase/firestore-document-not-found":
      return "Firebase Firestore Document Not Found";
    case "firebase/firestore-invalid-argument":
      return "Firebase Firestore Invalid Argument";
    default:
      return "Unknown Error";
  }
}

export {
  getFirebaseAuthErrorMessage,
  getFirebaseFirestoreErrorMessage,
};