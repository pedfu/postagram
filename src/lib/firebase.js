import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your FIREBASE config
const config = {
    
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
 
export { firebase, FieldValue };