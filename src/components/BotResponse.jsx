import React, { useEffect } from "react";
import { useState } from "react";

const BotResponse = ({ response }) => {
  const [botResoponse, setBotResponse] = useState("");

  useEffect(() => {
    let index = 1;
    let msg = setInterval(() => {
      setBotResponse(response.slice(0, index));
      if (index >= response.length) {
        clearInterval(msg);
      }
      index++;
    }, 100);
  }, [response]);

  return (
    <div>
      {botResoponse}
      {botResoponse === response ? "" : "|"}
    </div>
  );
};

export default BotResponse;
