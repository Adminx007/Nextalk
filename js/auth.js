import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ---------- SIGN UP ----------
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.onclick = async () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        photo: "",
        bio: "",
        online: true,
        lastSeen: serverTimestamp(),
        createdAt: serverTimestamp()
      });

      window.location.href = "home.html";

    } catch (err) {
      alert(err.message);
    }

  };
}

// ---------- LOGIN ----------
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.onclick = async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "home.html";

    } catch (err) {

      alert("Login Failed");

    }

  };

}

// ---------- AUTO LOGIN ----------
onAuthStateChanged(auth, (user) => {

  if (user) {

    if (
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.endsWith("/")
    ) {
      window.location.href = "home.html";
    }

  }

});

// ---------- LOGOUT ----------
window.logout = async () => {

  await signOut(auth);

  window.location.href = "login.html";

};
