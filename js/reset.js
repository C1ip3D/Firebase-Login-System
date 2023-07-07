import auth from './db.js'

let form = document.getElementById('resetForm')

form.addEventListener('submit', resetPassword)

function resetPassword(e){
    e.preventDefault()
    let email = document.getElementById('resetEmail').value
    firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{
		alert('Email sent')
		
    })
    .catch((error)=>{
        alert(error.message)
    })
}

