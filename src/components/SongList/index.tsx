import { LastFmTrack } from "../../interfaces";
import SongDetails from "./SongDetails";
interface SongListProps {
  trackData: LastFmTrack[];
}
export default function SongList(props: SongListProps) {
  const tracks = props.trackData;
  return (
    <div>
      <h1>Tracks</h1>
      <ul className="track-list">
        {tracks.map((e, i) => (
          <li key={i}>
            <SongDetails track={e} />
            {i !== tracks.length - 1 ? <hr /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
