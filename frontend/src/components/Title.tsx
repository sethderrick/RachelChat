import { useState } from "react";
import axios from "axios";

type Props = {
  setMessages: (messages: any[]) => void;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  // Reset the conversation
  const resetConversation = async () => {
    setIsResetting(true);

    await axios
      .get("http://127.0.0.1:8000/reset")
      .then((res) => {
        if (res.status === 200) {
          setMessages([]);
        } else {
          console.error("There was an error with the API request to backend");
        }
      })
      .catch((err) => {
        console.error(err.messages);
      });

    setIsResetting(false);
  };
  return (
    <div>
      <button onClick={resetConversation} className="bg-indigo-500 p-5">RESET</button>
    </div>
  );
}

export default Title;
