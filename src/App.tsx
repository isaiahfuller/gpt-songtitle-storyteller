import { useState } from "react";
import { LastFmTrack } from "./interfaces";
import SongList from "./components/SongList";
import Story from "./components/Story";

function App() {
  const [lfmUsername, setLfmUsername] = useState<string>("");
  const [trackNames, setTrackNames] = useState<string[]>([]);
  const [trackData, setTrackData] = useState<LastFmTrack[]>([]);

  async function getTracks() {
    const baseUrl: string =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks";
    const options: string = `&user=${lfmUsername}&api_key=${
      import.meta.env.VITE_LASTFM_API
    }&format=json&limit=10`;
    const response = await fetch(baseUrl + options).then((res) => res.json());
    const trackNames = [];
    setTrackData(response.toptracks.track);
    for (const track of response.toptracks.track) {
      trackNames.push(track.name.replace(/\s(f(ea)*t\..*|\(.*)/g, ""));
    }
    setTrackNames(trackNames);
  }

  return (
    <div className="main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getTracks();
        }}
      >
        <span>
          <label htmlFor="lfm">Last.fm Username: </label>
          <input
            type="text"
            name="lfm"
            value={lfmUsername}
            onChange={(e) => setLfmUsername(e.target.value)}
          />
        </span>
        <input type="submit" value="Get tracks" className="button" />
      </form>
      {trackData.length ? (
        <>
          <SongList trackData={trackData} />
          <Story trackNames={trackNames} />
        </>
      ) : null}
    </div>
  );
}

export default App;
