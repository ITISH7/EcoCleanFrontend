import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase.config";

const getChatId = (userId1: string, userId2: string) => {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};

export const useChat = (userId: string, otherUserId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  
  useEffect(() => {
    const chatId = getChatId(userId, otherUserId);
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [userId, otherUserId]);

  return messages;
};

 