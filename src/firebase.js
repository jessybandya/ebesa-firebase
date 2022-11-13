import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAW-IeNbkxxHHvx-EBCoY8zh0GsuZHFbRw",
    authDomain: "engineering-ebesa.firebaseapp.com",
    projectId: "engineering-ebesa",
    storageBucket: "engineering-ebesa.appspot.com",
    messagingSenderId: "78078682666",
    appId: "1:78078682666:web:aa3c6aaec189395622c553",
    measurementId: "G-NC7CZFN7F2"
  };
  
  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};