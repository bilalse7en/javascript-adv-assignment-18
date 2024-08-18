import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "./firebase.js";

  import Swal from "sweetalert2";
  
  // Handle Auth State Changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      Swal.fire({
        title: 'Welcome!',
        text: 'You are logged in.',
        icon: 'success',
        confirmButtonText: 'Continue'
      });
      const uid = user.uid;
    accountButton.style.display = 'inline-flex';
    signInButton.style.display = 'none';
      // Additional code to handle the signed-in user...
    } else {
      // User is signed out
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to continue.',
        icon: 'warning',
        confirmButtonText: 'Login'
      });
    }
  });
  
  
  // Sign Up Function
  const signup = () => {
    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
  
    if (!validateUsername() || !validateEmail() || !validatePassword()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fix the errors before submitting.",
      });
      return;
    }
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(({ user }) => {
        if (user) {
          // Check if the user is authenticated
          if (auth.currentUser) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Registered successfully",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = "./signin.html";
            });
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  
  // Sign In Function
  const signIn = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
  
    if (!validateEmail() || !validatePassword()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fix the errors before submitting.",
      });
      return;
    }
  
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(({ user }) => {
        if (user) {
          // Check if the user is authenticated
          if (auth.currentUser) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Logged in successfully",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.href = "./index.html";
            });
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };
  
  // Validation Functions
const showError = (element, message, duration = 300) => {
    element.classList.add('errorMsg'); // Correctly add class
    element.textContent = message;
    element.style.display = 'block';
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease`;

    requestAnimationFrame(() => {
        element.style.height = element.scrollHeight + 'px';
    });

    // Reset height to auto after the transition
    setTimeout(() => {
        element.style.height = ''; // Clear inline height for natural size
    }, duration);
};

// Helper function to hide error message with slide up effect
const hideError = (element, duration = 300) => {
    element.style.transition = `height ${duration}ms ease`;
    element.style.height = element.scrollHeight + 'px';

    requestAnimationFrame(() => {
        element.style.height = '0px';
    });

    setTimeout(() => {
        element.style.display = 'none';
        element.style.height = ''; // Clear inline height for natural size
    }, duration);
};

// Validate Username
const validateUsername = () => {
    const username = document.getElementById("username").value;
    const usernameError = document.getElementById("username-error");

    if (username.length < 3) {
        showError(usernameError, "Username must be at least 3 characters long.");
        return false;
    } else {
        hideError(usernameError);
        return true;
    }
};

// Validate Email
const validateEmail = () => {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        showError(emailError, "Please enter a valid email address.");
        return false;
    } else {
        hideError(emailError);
        return true;
    }
};

// Validate Password
const validatePassword = () => {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("password-error");

    if (password.length < 6) {
        showError(passwordError, "Password must be at least 6 characters long.");
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
};
  

  let username = document.getElementById("username")
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let signupBtn = document.getElementById("signupBtn")
  let signinBtn = document.getElementById("signinBtn")
  let signOutBtn = document.getElementById("signOutBtn")
  // Event Listenersa
  
  username && username.addEventListener("input", validateUsername);
  email && email.addEventListener("input", validateEmail);
  password && password.addEventListener("input", validatePassword);
  signupBtn && signupBtn.addEventListener("click", signup);
  signinBtn && signinBtn.addEventListener("click", signIn);
  
  signOutBtn && signOutBtn.addEventListener('click', (event) => {
    event.preventDefault();

  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to sign out?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, sign out!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth).then(() => {
        // Sign-out successful.
        Swal.fire({
          title: 'Signed Out',
          text: 'You have been signed out successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }).catch((error) => {
        // An error happened during sign-out.
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while signing out. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    } else {
      // User canceled the sign-out process.
      Swal.fire({
        title: 'Cancelled',
        text: 'You are still logged in.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('myCartDropdownButton1').click();
  })
});