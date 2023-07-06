import { auth, storage } from './db.js';

let authContainer = document.getElementsByClassName('auth')[0];
let content = document.getElementsByClassName('content')[0];
let registerForm = document.getElementById('register');
let loginForm = document.getElementById('login');
let signoutBTN = document.getElementById('SignOut');
let verifyBTN = document.getElementById('verify');
let alertHTML = document.getElementById('alertHTML');
let alert = document.getElementsByClassName('alert')[0];
let contentAlertHTML = document.getElementById('contentAlertHTML');
let pfpBTN = document.getElementById('fileSubmit');
alert.style.width = authContainer.style.width;

//Event Listeners
registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
signoutBTN.addEventListener('click', signOut);
verifyBTN.addEventListener('click', EmailVerifcation);
pfpBTN.addEventListener('click', uploadPfp);

//User signed in?

auth.onAuthStateChanged(function (user) {
  if (user) {
    authContainer.style.display = 'none';
    content.style.display = 'grid';
    checkEmailVerification();

    let storageRef = storage
      .ref()
      .child('profilePictures/' + user.uid + '/profilePicture.jpg');

    storageRef
      .getDownloadURL()
      .then(function (downloadURL) {
        let img = document.getElementById('profilePicture');
        img.src = downloadURL;
      })
      .catch(function (error) {
        let img = document.getElementById('profilePicture');
        img.style.display = 'none';
        contentAlertHTML.innerHTML = 'Please select a profile picture';
        contentAlertHTML.classList.add('animate');
        console.error('Error fetching profile picture:', error);

        setTimeout(function () {
          contentAlertHTML.classList.remove('animate');
        }, 3000);
      });
  } else {
    authContainer.style.display = 'block';
    content.style.display = 'none';
  }
});

function registerUser(e) {
  e.preventDefault();

  let registerEmail = document.getElementById('registerEmail').value;
  let registerPassword = document.getElementById('registerPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (registerPassword != confirmPassword) {
    alert('Passwords do not match');
    registerForm.reset();
    loginForm.reset();
    return;
  }
  auth
    .createUserWithEmailAndPassword(registerEmail, confirmPassword)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      if (error.code == 'auth/weak-password') {
        console.error(error);
        alertHTML.innerHTML = `<h1 id="alertHTML">Password is too weak! <br>Enter a password with at least 6 characters</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/email-already-in-use') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Email already in use!</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/invalid-email') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Invalid Email</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else {
        alertHTML.innerHTML = `<h1 id="alertHTML">An unknown error has occured</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      }
    });
}

function loginUser(e) {
  e.preventDefault();
  let loginEmail = document.getElementById('loginEmail').value;
  let loginPassword = document.getElementById('loginPassword').value;
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      if (error.code == 'auth/wrong-password') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Incorrect Password</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/user-not-found') {
        alertHTML.innerHTML = `<h1 id="alertHTML">User not found</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else if (error.code == 'auth/invalid-email') {
        alertHTML.innerHTML = `<h1 id="alertHTML">Invalid Email</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      } else {
        alertHTML.innerHTML = `<h1 id="alertHTML">An unknown error has occured</h1>`;
        alertHTML.style.fontSize = '1rem';
        alertHTML.style.color = 'black';
        alertHTML.style.textAlign = 'center';
        alert.classList.add('animate');
        registerForm.reset();
        loginForm.reset();
        setTimeout(function () {
          alert.classList.remove('animate');
        }, 3000);
      }
    });
}

function signOut() {
  auth
    .signOut()
    .then(function () {
      return;
    })
    .catch(function (error) {
      contentAlertHTML.innerHTML = 'Please select a profile picture';
      contentAlertHTML.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        contentAlertHTML.classList.remove('animate');
      }, 3000);
    });
}

function EmailVerifcation() {
  let user = auth.currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      contentAlertHTML.innerHTML = 'Please select a profile picture';
      contentAlertHTML.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        contentAlertHTML.classList.remove('animate');
      }, 3000);
    })
    .catch(function (error) {
      contentAlertHTML.innerHTML = 'Error sending email verification';
      contentAlertHTML.classList.add('animate');
      registerForm.reset();
      loginForm.reset();
      setTimeout(function () {
        alert.classList.remove('animate');
      }, 3000);
      console.error(error);
    });
}

function checkEmailVerification() {
  let user = auth.currentUser;
  if (user && user.emailVerified) {
    console.log('User is email verified');
    verifyBTN.style.display = 'none';
  } else {
  }
}

function uploadPfp() {
  let file = document.getElementById('fileUploader').files[0];
  let user = auth.currentUser;
  let storageRef = storage
    .ref()
    .child('profilePictures/' + user.uid + '/profilePicture.jpg');

  storageRef
    .put(file)
    .then(function (snapshot) {
      contentAlertHTML.innerHTML = 'Profile picture uploaded successfully!';
      contentAlertHTML.classList.add('animate');

      setTimeout(function () {
        contentAlertHTML.classList.remove('animate');
      }, 5000);
      return storageRef.getDownloadURL();
    })
    .then(function (downloadURL) {
      let img = document.getElementById('profilePicture');
      img.src = downloadURL;
      img.style.display = 'block';
    })
    .catch(function (error) {
      console.error('Error uploading profile picture:', error);
    });
}
