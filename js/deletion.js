import { firestore } from './db.js';

let form = document.getElementById('feedback');
let firestoreRef = firestore.collection('feedback');

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
      console.log('Data added successfully');
    })
    .catch((error) => {
      console.error(error);
      console.log('Error adding data');
    });

  form.reset();
}
