// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkkPS0QmGmELML1pPGOqeMYsw9ikKZdYY",
  authDomain: "profileprep-67739.firebaseapp.com",
  projectId: "profileprep-67739",
  storageBucket: "profileprep-67739.appspot.com",
  messagingSenderId: "457597445208",
  appId: "1:457597445208:web:2aa9ce44d4e089c2ead62d",
  measurementId: "G-PTPMD7QV0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();








let email = document.getElementById('Email').value;
let password = document.getElementById('Password').value;
let firstname = document.getElementById('Username').value;




// SignUp
let registerButton = document.getElementById('registerSubmitBtn');
registerButton.addEventListener('click', () => {
    let email = document.getElementById('Email').value;
    let password = document.getElementById('Password').value;
    let firstname = document.getElementById('Username').value;
    // if (!validateEmail(email)) {
    //     alert('Invalid email format');
    //     return;
    // }
    createUserWithEmailAndPassword1(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: firstname,
                email: email,
                password: password,
            })
                .then(() => {
                    alert('User created successfully!');
                    showlogin();
                })
                .catch((error) => {
                    alert('error');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});






// Login
let loginButton = document.getElementById('loginSubmitBtn');
loginButton.addEventListener('click', () => {
    let email = document.getElementById('Emaillogin').value;
    let password = document.getElementById('Passwordlogin').value;
    // if (!validateEmail(email)) {
    //     alert('Invalid email format');
    //     return;
    // }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
              // Optionally, handle success (e.g., redirect to dashboard)
              window.location.href = 'Ticket.html'; // Redirect to dashboard after login
          })
            // update(ref(database, 'users/' + user.uid), {
            //     last_login: Date.now()
            // })
            //     .then(() => {
            //         alert('User Logged in successfully!');
            //         localStorage.setItem('isLoggedIn', 'true'); // Set login state
            //         window.location.href = 'Ticket.html'; // Redirect to ticket page
            //     })
            //     .catch((error) => {
            //         alert('error');
            //     });
        
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});




//Logout
let logout = document.getElementById('logoutBtn');
logout.addEventListener('click', ()=>{

  signOut(auth).then(() => {
    // Sign-out successful.
    alert('logout successfully!');
  }).catch((error) => {
    // An error happened.
  });
});


// Forgot password link event listener
let forgotpassword = document.getElementById('Forgotpassword');
forgotpassword.addEventListener('click', () => {
    let email = document.getElementById('Emaillogin').value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
});


//Valid email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
