import { useState } from "react";
import { sendMessage } from "@/utils/chatService";
import { useChat } from "@/utils/hooks/useChat";

const Chat = ({ currentUser="ayush", receiverUser="divya" }) => {
    
  const [text, setText] = useState("");
  const messages = useChat(currentUser, receiverUser);

  const handleSend = async () => {
    if (text.trim()) {
      await sendMessage(currentUser, receiverUser, text);
      setText("");
    }
  };

  return (
    <div className="flex pt-24 w-[100vw] h-[100vh]">
      <h3>Chat with {receiverUser}</h3>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.senderId === currentUser ? "You" : "Them"}: </strong>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
 