import {RenderMessageBox} from "./RenderMessageBox.js";
import {auth} from "../firebase.js";



export const RenderMessages = async (usersObject, messagesObject, replyObject) => {


    const checkForReply = (messageId) => {
        console.log("checking for reply")
        for (const replyKey in replyObject) {
            if (!Object.hasOwn(replyObject, replyKey)) continue;

            const reply = replyObject[replyKey]
            // console.log(reply.parent_id)
            // console.log(messageId)
            if(reply.parent_id === messageId){
                console.log("WE HAVE A HIT")
                for (const userKey in usersObject) {

                    if (!Object.hasOwn(usersObject, userKey)) continue;
                    
                    const user = usersObject[userKey];
                    // console.log(user)
                    if(user.user_id === reply.user_id){
                        RenderMessageBox(user, reply, reply.message_id)
                    }
                }
            checkForReply(reply.message_id);
            }
            // console.log(messageId)
        }
    }

    const reverseObject = (obj) => {
        const reversed = {};
        Object.keys(obj)
            .sort()
            .reverse()
            .forEach((key) => {
                reversed[key] = obj[key];
            });
        return reversed;
    };

    const reversedMessages = reverseObject(messagesObject);

    for (const messageKey in reversedMessages) {
        if (!Object.hasOwn(reversedMessages, messageKey)) continue;

        const messageElement = reversedMessages[messageKey];
        for (const userKey in usersObject) {
            const userElement = usersObject[userKey];
            // console.log(userElement);

            if (userElement.user_id === messageElement.user_id) {
                // console.log(
                //     `${userKey} wrote the message with ID ${messageKey}`,
                // );
                // console.log(messageElement);
                RenderMessageBox(userElement, messageElement, messageKey);
                // console.log(messageKey);

                checkForReply(messageElement.message_id);
            }
        }
    }
};
