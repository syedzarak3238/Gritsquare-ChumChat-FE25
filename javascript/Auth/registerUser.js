import { usersRef } from "../firebase.js";
import { push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { setCurrentUser } from "./auth.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const formBody = document.querySelector(".form-body");
const auth = getAuth();

formBody.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(formBody);

    const email = formData.get("email");
    const password = formData.get("password");
    const pfpurl = formData.get("pfp-url");

    console.log(email);

    const userId = await createUserWithEmailAndPassword(auth, email, password)

    registerUser(userId.user.uid, pfpurl)
});

const registerUser = (userId, pfpUrl) => {
    const newUser = push(usersRef);

    const userData = {
        user_id: userId,
        role: "visitor",
        img: pfpUrl,
    }

    set(newUser, userData);
    setCurrentUser(newUser)
}