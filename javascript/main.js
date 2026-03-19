import { db, messagesRef, repliesRef } from "./firebase.js";
import { currentUser } from "./auth.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { RenderMessageBox } from "./RenderMessageBox.js";

export const sendMessage = (text) => {
    if (!currentUser) return alert("Log in first dumbass!");
    const newMsg = push(messagesRef);

    const messageData = {
        message: text,
        message_id: newMsg.key,
        user_id: currentUser.user_id,
        timestamp: Date.now()
    }

    set(newMsg, messageData);
}

export const sendReply = (messageId, text) => {
    const newReply = push(repliesRef);

    const replyData = {
        message: text,
        message_id: messageId,
        user_id: currentUser.user_id,
        timestamp: Date.now()
    }

    set(newReply, replyData);
}

onValue(messagesRef, snapshot => {
    const messages = snapshot.val();
    console.log(messages);

    document.querySelector(".chat-container").innerHTML = "";  
    for (let id in messages) {
        const msg = messages[id];
        RenderMessageBox(currentUser, msg);  
    }

}, error => {
    console.error("Firebase read failed:", error);
    alert("Couldn't get messages from database.")
});

export const deleteMessage = async (messageId) => {
    await remove(ref(db, "messages/" + messageId));

    const snapshot = await get(repliesRef);
    const replies = snapshot.val();
    if (!replies) return;

    for (let id in replies) {
        if (replies[id].message_id === messageId) {
            await remove(ref(db, "replies/" + id));
        }
    }
}

//test
RenderMessageBox("Eddie", "I hate my life");
