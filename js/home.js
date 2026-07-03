import { auth, db } from "./firebase.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const usersDiv = document.getElementById("users");

onAuthStateChanged(auth, async(user)=>{

if(!user){

location.href="login.html";
return;

}

loadUsers(user.uid);

});

async function loadUsers(myUid){

usersDiv.innerHTML="Loading...";

const snap = await getDocs(collection(db,"users"));

usersDiv.innerHTML="";

snap.forEach(doc=>{

const u=doc.data();

if(u.uid===myUid) return;

usersDiv.innerHTML +=`

<div class="user"
onclick="location.href='chat.html?uid=${u.uid}'">

<div>

<div class="name">
${u.name}
</div>

<div class="online">
${u.online ? "🟢 Online":"⚫ Offline"}
</div>

</div>

</div>

`;

});

}
