import { auth, reference, db, messagesRef, repliesRef } from "../firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export const sendReply = (messageId, text) => {
    const user = auth.currentUser;


    const newReply = push(repliesRef);
    const replyData = {
        message: text,
        message_id: messageId,
        user_id: user.uid,
        timestamp: Date.now()
    }

    console.log(replyData)

    set(newReply, replyData);
}
