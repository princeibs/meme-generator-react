import memeIcon from "./meme_icon.ico"

export default function Header() {
  return (
    <div className="header">
      <ul>
        <li>
          <img src={memeIcon} alt="Logo" />
        </li>
        <li className="content-title">Meme Generator</li>
      </ul>
    </div>
  );
}