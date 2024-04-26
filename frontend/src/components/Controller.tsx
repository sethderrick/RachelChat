import { useState } from "react";
import Title from "./Title";
import RecordMessage from "./RecordMessage";
import axios from "axios";

function Controller() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  // convert data from backend to useable format
  const createBlobUrl = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  };

  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // Convert blobUrl to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio 
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // Send form data to API endpoint
        await axios.post("http://127.0.0.1:8000/post-audio", formData, {
          headers: { "Content-Type": "audio/mpeg" }, 
          responseType: "arraybuffer",
        })
        .then((res: any) => {
          const blob = res.data;
          const audio = new Audio();
          audio.src = createBlobUrl(blob);

          // Append to audio
          const rachelMessage = { sender: "rachel", blobUrl: audio.src };
          messagesArr.push(rachelMessage);
          setMessages(messagesArr);

          // Play audio
          setIsLoading(false)
          audio.play();
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        })
    });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      <Title setMessages={setMessages} />
      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controller;
