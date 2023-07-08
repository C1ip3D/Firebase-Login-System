import { firestore } from './db.js';

let form = document.getElementById('feedback');
let firestoreRef = firestore.collection('feedback');
let deleteAlertHTML = document.getElementById('deleteAlertHTML');

form.addEventListener('submit', submission);

function submission(e) {
  e.preventDefault();

  let reason = document.getElementById('reasonInput').value;
  let fix = document.getElementById('fixInput').value;
  let email = document.getElementById('email').value;
  let id = email.split('@')[0];
  let docRef = firestoreRef.doc(id);
  let ext = email.split('@')[1];

  let data = {
    reason: reason,
    fix: fix,
    domain: ext,
  };

  docRef
    .set({
      data,
    })
    .then(() => {
      deleteAlertHTML.innerHTML =
        'Feedback saved! Automatically redirecting back';
      deleteAlertHTML.classList.add('animate');
      setTimeout(function () {
        deleteAlertHTML.classList.remove('animate');
        window.location.href = 'index.html';
      }, 3000);

      console.log('Data added successfully');
      form.reset();
    })
    .catch((error) => {
      deleteAlertHTML.innerHTML = 'An error has occured! Please try again';
      deleteAlertHTML.classList.add('animate');
      setTimeout(function () {
        deleteAlertHTML.classList.remove('animate');
      }, 3000);
      console.error('Error adding data', error);
    });
}
