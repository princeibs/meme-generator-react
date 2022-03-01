import React, { useState } from "react";
// import data from "./memesData";

export default function MemeGenerator() {
  const [allMemeImages, setAllMemeImages] = useState([])
  const [meme, setMeme] = useState({   
    topText: "",
    bottomText: "",
    name: "Index Image",
    url: "https://i.imgflip.com/30b1gx.jpg",
  });
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))
  }, [])
 
  const getNewMeme = () => {
    const randomId = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomId].url
    setMeme(prevMeme => ({
      ...prevMeme,
      url
    }))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        [name]: value
      }
    })
  }
  return (
    <div className="content-body">
      <div className="input-group">
        <input name="topText" value={meme.topText} onChange={handleChange} type="text" placeholder="Top text" />
        <input name="bottomText" value={meme.bottomText} onChange={handleChange} type="text" placeholder="Bottom text" />
      </div>
      <button onClick={() => getNewMeme()}>
        Get a new meme image 😎
      </button>
      <div className="meme-img">
        <div className="top-text meme-text">{meme.topText}</div>
        <div className="bottom-text meme-text">{meme.bottomText}</div>
        <img src={meme.url} alt={meme.name} />

      </div>
    </div>
  );
}
