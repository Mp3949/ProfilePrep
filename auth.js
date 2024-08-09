import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// SignUp
const registerButton = document.getElementById('registerSubmitBtn');
registerButton.addEventListener('click', () => {
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const firstname = document.getElementById('Username').value;

    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // User is created, but we're not storing additional information in the database
            alert('User created successfully!');
            showlogin(); // Ensure this function is defined
        })
        .catch((error) => {
            console.error('SignUp Error:', error);
            alert(`Error: ${error.message}`);
        });
});

// Login
const loginButton = document.getElementById('loginSubmitBtn');
loginButton.addEventListener('click', () => {
    const email = document.getElementById('Emaillogin').value;
    const password = document.getElementById('Passwordlogin').value;

    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = 'Courses.html'; // Redirect after successful login
        })
        .catch((error) => {
            console.error('Login Error:', error);
            alert(`Error: ${error.message}`);
        });
});

// Logout
const logoutButton = document.getElementById('logoutBtn');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Logged out successfully!');
        window.location.href = 'login.html'; // Redirect after logout
    }).catch((error) => {
        console.error('Logout Error:', error);
        alert('Logout failed, please try again.');
    });
});

// Forgot password
const forgotPasswordButton = document.getElementById('Forgotpassword');
forgotPasswordButton.addEventListener('click', () => {
    const email = document.getElementById('Emaillogin').value;

    if (!validateEmail(email)) {
        alert('Invalid email format');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent!');
        })
        .catch((error) => {
            console.error('Password Reset Error:', error);
            alert('Failed to send password reset email, please try again.');
        });
});

// Valid email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Ensure this function is defined
var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");

    function showlogin() {
        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }

    function showregister() {
        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }
