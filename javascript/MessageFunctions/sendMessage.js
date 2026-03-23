import { auth, reference, db, messagesRef, repliesRef } from "../firebase.js";
import { push, set, onValue, remove, ref, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { censorBadWords } from "../function/censor.js";

const messageForm = document.querySelector(".send-message");

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(messageForm);
    const message = formData.get("message");

    sendMessage(message)
})

const sendMessage = async (text = "") => {

    const user = auth.currentUser;
    if (!user) return alert("Logga in först!");

    if (!text || !text.trim()) {
        return alert("Skriv ett meddelande först.");
    }

    let safeMessage = text;
    try {
        safeMessage = censorBadWords(text);
    } catch (error) {
        console.error("Censur-fel, skickar obehandlat meddelande:", error);
        safeMessage = text;
    }

    const newMsg = push(messagesRef);
    const messageData = {
        message: safeMessage,
        message_id: newMsg.key,
        user_id: user.uid,
        timestamp: Date.now(),
    };

    try {
        await set(newMsg, messageData);
        messageForm.reset();
    } catch (error) {
        console.error("Kunde inte skicka meddelandet:", error);
        alert("Fel vid skickning av meddelandet. Försök igen.");
    }
}