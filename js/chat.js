import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const params = new URLSearchParams(location.search);
const otherUid = params.get("uid");

const chatName = document.getElementById("chatName");
const messages = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("message");

let myUid = "";
let roomId = "";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  myUid = user.uid;
  roomId = [myUid, otherUid].sort().join("_");

  const userDoc = await getDoc(doc(db, "users", otherUid));
  if (userDoc.exists()) {
    chatName.textContent = userDoc.data().name;
  }

  loadMessages();
});

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  await addDoc(collection(db, "chats", roomId, "messages"), {
    sender: myUid,
    text: text,
    createdAt: serverTimestamp()
  });

  input.value = "";
};

function loadMessages() {
  const q = query(
    collection(db, "chats", roomId, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, (snapshot) => {
    messages.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();

      const div = document.createElement("div");
      div.className = data.sender === myUid ? "me" : "other";
      div.textContent = data.text;

      messages.appendChild(div);
    });

    messages.scrollTop = messages.scrollHeight;
  });
}
