import firebase from 'firebase'
import 'firebase/firestore';
//import 'firebase/auth';
//import "firebase/database";

// firebase init goes here
/* -- original config when auth was not configured -- */
/*
const config = {
    apiKey: "AIzaSyD59tyAwEV5LOrPjfRJyPjak73vDUuB3io",
    authDomain: "gluco24db.firebaseapp.com",
    databaseURL: "https://gluco24db.firebaseio.com",
    projectId: "gluco24db",
    storageBucket: "gluco24db.appspot.com",
    messagingSenderId: "217913063862"
};
*/

/* -- configuration for auth support -- */

const config = {
    apiKey: "AIzaSyD59tyAwEV5LOrPjfRJyPjak73vDUuB3io",
    authDomain: "gluco24db.firebaseapp.com",
    databaseURL: "https://gluco24db.firebaseio.com",
    projectId: "gluco24db",
    storageBucket: "gluco24db.appspot.com",
    messagingSenderId: "217913063862" 
};

firebase.initializeApp(config)

/*
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(config);
    } catch (err) {
        window.console.error(‘Firebase initialization error raised’, err.stack)
    }
}
*/
// firebase utils
 const db = firebase.firestore()
//const db = firebase.database();
const auth = firebase.auth();
const currentUser = auth.currentUser
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

// date issue fix according to firebase
// const settings = {
//    timestampsInSnapshots: true
// }
// db.settings(settings)

// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')
const meds = db.collection("meds");
//const meds = db.ref("meds");

export {
    db,
    auth,
    currentUser,
//    usersCollection,
//    postsCollection,
//    commentsCollection,
//    likesCollection
  meds,
  GoogleAuthProvider
}
