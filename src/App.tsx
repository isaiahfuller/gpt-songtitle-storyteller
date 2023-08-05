import { useState } from "react";
import { LastFmTrack } from "./interfaces";
import SongList from "./components/SongList";
import Story from "./components/Story";

function App() {
  const [lfmUsername, setLfmUsername] = useState<string>("");
  const [lfmPeriod, setLfmPeriod] = useState<string>("overall");
  const [trackNames, setTrackNames] = useState<string[]>([]);
  const [trackData, setTrackData] = useState<LastFmTrack[]>([]);

  async function getTracks() {
    const baseUrl: string =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks";
    const options: string = `&user=${lfmUsername}&api_key=${
      import.meta.env.VITE_LASTFM_API
    }&format=json&limit=10&period=${lfmPeriod}`;
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
        className="lfm-form"
        onSubmit={(e) => {
          e.preventDefault();
          getTracks();
        }}
      >
        <div className="flex flex-col sm:flex-row">
          <span className="form-input">
            <label htmlFor="lfm">Last.fm Username: </label>
            <input
              type="text"
              name="lfm"
              value={lfmUsername}
              onChange={(e) => setLfmUsername(e.target.value)}
            />
          </span>
          <span className="form-input">
            <label>Period: </label>
            <select value={lfmPeriod} onChange={(e)=>setLfmPeriod(e.target.value)}>
              <option value="overall">All time</option>
              <option value="12month">12 months</option>
              <option value="6month">6 months</option>
              <option value="3month">3 months</option>
              <option value="1month">1 month</option>
              <option value="7day">1 week</option>
            </select>
          </span>
        </div>
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
