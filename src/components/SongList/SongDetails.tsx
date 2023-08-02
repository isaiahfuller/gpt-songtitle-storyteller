import { LastFmTrack } from "../../interfaces";
interface SongDetailsProps{
  track: LastFmTrack
}
export default function SongDetails(props: SongDetailsProps){
  const track = props.track
  return(
    <a href={track.url} className="track-details">
      <div>
        <img src={track.image[0]["#text"]} />
      </div>
      <p>{track.name}</p>
      <p>by</p>
      <p>{track.artist.name}</p>
    </a>
  )
}