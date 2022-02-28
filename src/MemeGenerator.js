import { useState } from "react";
import data from "./memesData";

export default function MemeGenerator() {
  const [newMeme, changeMeme] = useState(data.memes[0].url);
  const handleGetNewMeme = () => {
    const randomId = Math.floor(Math.random() * data.memes.length);
    changeMeme(data.memes[randomId].url);  
  };
  return (
    <div className="content-body">
      <div className="input-group">
        <input type="text" />
        <input type="text" />
      </div>
      <button onClick={() => handleGetNewMeme()}>
        Get a new meme image 😎
      </button>
      <div className="meme-img">
        <img src={newMeme} />
      </div>
    </div>
  );
}
