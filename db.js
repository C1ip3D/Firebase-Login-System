const firebaseConfig = {
  apiKey: 'AIzaSyBw9usYegbob1a1ov1Hpvqtb_K2eMi3qHQ',
  authDomain: 'savingdatausinghtmlform.firebaseapp.com',
  databaseURL: 'https://savingdatausinghtmlform-default-rtdb.firebaseio.com',
  projectId: 'savingdatausinghtmlform',
  storageBucket: 'savingdatausinghtmlform.appspot.com',
  messagingSenderId: '648910756900',
  appId: '1:648910756900:web:b7ed74e8e4ec14e8408cb1',
};

firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let storage = firebase.storage();

export { auth, storage };
