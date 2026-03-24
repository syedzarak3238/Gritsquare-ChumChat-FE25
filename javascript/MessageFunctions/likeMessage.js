import { ref, runTransaction, set, remove, getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
import { auth } from "../firebase.js";

const db = getDatabase();

export const toggleLike = async (id, isLiked, type) => {
    const user = auth.currentUser;
    if (!user) return;

    const likeRef = ref(db, `${type}/${id}/likes`);
    const userLikeRef = ref(db, `users/${user.uid}/likedPosts/${id}`);   
    
    try {
        await runTransaction(likeRef, (currentLikes) => {
            if (isLiked) {
                    return Math.max(0, (currentLikes || 0) - 1);
                } else {
                    return (currentLikes || 0) + 1;
                }
            });
        if (isLiked) {
            await remove(userLikeRef);
        } else {
            await set(userLikeRef, true);
        }
        } catch (error) {
            console.error("Det gick inte att likea", error);
        }
}
    