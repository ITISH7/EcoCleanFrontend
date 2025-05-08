import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase.config";

// Function to generate unique chat ID (sorted for consistency)
const getChatId = (userId1: string, userId2: string) => {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};

export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  try {
    const chatId = getChatId(senderId, receiverId);

    await setDoc(doc(db, "chats", chatId), {
      user1: senderId,
      user2: receiverId,
      lastMessage: text,
      lastTimestamp: serverTimestamp(),
    }, { merge: true });

    // Send message inside chat
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

 