import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


  // Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDrGJp9TNigOxTfI5t0krEJ_hDKs_jC5vM",
authDomain: "tiendatmm-cf4ae.firebaseapp.com",
databaseURL: "https://tiendatmm-cf4ae.firebaseio.com",
projectId: "tiendatmm-cf4ae",
storageBucket: "tiendatmm-cf4ae.appspot.com",
messagingSenderId: "1034970820033",
appId: "1:1034970820033:web:965e5b259a03b3f96ed340"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export { firebase, auth, db, storage }