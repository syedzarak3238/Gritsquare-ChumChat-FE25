//Register + login-functions

import { usersRef, db } from "./firebase.js";
import { push, set, get, update } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export let currentUser = null;

export const registerUser = (username, password, role) => {
    const newUser = push(usersRef);

    const userData = {
        user_id: newUser.key,
        username: username,
        password: password,
        role: role,
        isLoggedIn: true,
        img: "../img/kid.png",
    }

    set(newUser, userData);
    currentUser = userData;
}

export const loginUser = async (username, password) => {
    try {
        const snapshot = await get(usersRef);

        if (!snapshot.exists()) {
            alert("No users found");
            return;
        }

        const users = snapshot.val();
        let foundUser = null;

        for (let id in users) {
            if (users[id].username === username && users[id].password === password) {
                foundUser = users[id];
                break;
            }
        }

        if (foundUser) {
            currentUser = foundUser;
            alert("Logged in!");
        } else {
            alert("Wrong username or password");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
};

export const logOutUser = async () => {
    if (!currentUser) return;

    try {
        await update(ref(db, "users/" + currentUser.user_id), {
            isLoggedIn: false
        });

        currentUser = null;
        alert("Logged Out!");
    } catch (error) {
        console.log(error);
    }
}