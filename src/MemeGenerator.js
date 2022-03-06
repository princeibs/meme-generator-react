import React, { useState } from "react";
import uploadIcon from "./icons/upload-image.png";
import downloadIcon from "./icons/download-icon.png";
import * as htmlToImage from "html-to-image";

const TEXT_MAX_LENGTH = 72;
const OK_LENGTH = 30;
const WARNING_LENGTH = 50;

export default function MemeGenerator() {
  const [allMemeImages, setAllMemeImages] = useState([]);
  const [prevMemeImages, setPrevMemeImages] = useState([]);
  const [memeTextSize, setMemeTextSize] = useState(40);
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
    setPrevMemeImages((prevMemeImages) => [...prevMemeImages, meme]);
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
    if (value.length <= TEXT_MAX_LENGTH) {
      setMeme((prevMeme) => {
        return {
          ...prevMeme,
          [name]: value,
        };
      });
    }
  }

  function handleChangeTextSize(event) {
    const memeTextSize = event.target.value;
    setMemeTextSize(parseInt(memeTextSize));
  }

  function topTextCountStyle(length) {
    const color =
      length <= OK_LENGTH
        ? "green"
        : length <= WARNING_LENGTH
          ? "yellow"
          : "red";
    return { borderColor: color };
  }

  function handleIconClick(e) {
    const name = e.target.name;
    if (name === "download") downloadMeme("meme-node");
  }

  return (
    <div className="content-body">
      <div className="input-group">
        <div className="top-text-input">
          <input
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            type="text"
            placeholder="Top text"
          />
          <div
            style={topTextCountStyle(meme.topText.length)}
            className="char-count"
          >
            {TEXT_MAX_LENGTH - meme.topText.length}
          </div>
        </div>
        <div className="bottom-text-input">
          <input
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            type="text"
            placeholder="Bottom text"
          />
          <div
            style={topTextCountStyle(meme.bottomText.length)}
            className="char-count"
          >
            {TEXT_MAX_LENGTH - meme.bottomText.length}
          </div>
        </div>
      </div>
      <div className="btn-group">
        <button
          className="btn-prev"
          disabled={!prevMemeImages.length}
          onClick={getPrevMeme}
        >
          Previous image
        </button>
        <button className="btn-next" onClick={() => getNewMeme()}>
          New random image
        </button>
      </div>
      <div id="meme-node" className="meme-img">
        <div style={{ fontSize: memeTextSize }} className="top-text meme-text">
          {meme.topText}
        </div>
        <div
          style={{ fontSize: memeTextSize }}
          className="bottom-text meme-text"
        >
          {meme.bottomText}
        </div>
        <img src={meme.url} alt={meme.name} />
      </div>
      <div className="controls">
        <div className="text-size">
          <div className="label">Text size</div>
          <input
            id="change-font"
            onChange={handleChangeTextSize}
            type="range"
            min={1}
            max={100}
            defaultValue={40}
            className="slider"
          />
        </div>
      </div>
      <div className="icon-group">
        <img
          name="download"
          onClick={handleIconClick}
          src={downloadIcon}
          alt="Download image "
        />
        <img
          name="shareToTwitter"
          onClick={handleIconClick}
          src={uploadIcon}
          alt="Upload image"
        />
      </div>
    </div>
  );
}

function downloadMeme(node) {
  const targetNode = document.getElementById(node);
  htmlToImage
    .toPng(targetNode)
    .then((dataUrl) => {
      const elem = document.createElement("a");
      elem.setAttribute("href", dataUrl);
      elem.setAttribute("download", "New_Meme");
      document.body.appendChild(elem);
      elem.click();
      elem.remove();
    })
    .catch(function (error) {
      console.error("oops, something went wrong");
    });
}

function uploadImage() { }
