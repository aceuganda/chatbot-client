import React, { useEffect } from "react";
import { useState } from "react";

const BotResponse = ({ response }) => {
  const [botResponse, setBotResponse] = useState("");

  useEffect(() => {
    let index = 0;
    let msg = setInterval(() => {
      if (index < response.length) {
        const currentMsg = response[index];
        if (currentMsg.text) {
          setBotResponse(prevResponse => prevResponse + currentMsg.text);
        } else if (currentMsg.image) {
          setBotResponse(currentMsg.image);
        }
        index++;
      } else {
        clearInterval(msg);
      }
    }, 100);
    return () => clearInterval(msg);
  }, [response]);

  return <div>{botResponse === ""? "Sorry repeat for me, I didnt get that": botResponse}</div>;
};

export default BotResponse;
