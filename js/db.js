const firebaseConfig = {
  apiKey: "AIzaSyBw9usYegbob1a1ov1Hpvqtb_K2eMi3qHQ",
  authDomain: "savingdatausinghtmlform.firebaseapp.com",
  databaseURL: "https://savingdatausinghtmlform-default-rtdb.firebaseio.com",
  projectId: "savingdatausinghtmlform",
  storageBucket: "savingdatausinghtmlform.appspot.com",
  messagingSenderId: "648910756900",
  appId: "1:648910756900:web:f7cd1e32859773c6408cb1"
};

firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let storage = firebase.storage();
let db = firebase.database()
let firestore = firebase.firestore()

export { auth, storage, db, firestore };
