import React, { useState } from "react";
// import data from "./memesData";

export default function MemeGenerator() {
  const [allMemeImages, setAllMemeImages] = useState([]);
  const [prevMemeImages, setPrevMemeImages] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    name: "Index Image",
    url: "https://i.imgflip.com/30b1gx.jpg",
  });
  React.useEffect(() => {
    async function getMemes() {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  const getNewMeme = () => {
    const randomId = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomId].url;
    setPrevMemeImages(prevMemeImages => [...prevMemeImages, meme])    
    setMeme((prevMeme) => ({
      ...prevMeme,
      url,
    }));
  };

  function getPrevMeme() {
    const prevMeme = prevMemeImages.pop();
    const url = prevMeme.url;        
    setMeme((currentMeme) => ({
      ...currentMeme,
      url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }
  return (
    <div className="content-body">
      <div className="input-group">
        <input
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          type="text"
          placeholder="Top text"
        />
        <input
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          type="text"
          placeholder="Bottom text"
        />
      </div>
      <div className="btn-group">
        <button className="btn-prev" disabled={!prevMemeImages.length} onClick={getPrevMeme}>
          Previous image
        </button>
        <button className="btn-next" onClick={() => getNewMeme()}>
          New random image
        </button>
      </div>
      <div className="meme-img">
        <div className="top-text meme-text">{meme.topText}</div>
        <div className="bottom-text meme-text">{meme.bottomText}</div>
        <img src={meme.url} alt={meme.name} />
      </div>
    </div>
  );
}
