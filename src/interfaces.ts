export interface LastFmTrack{
  artist: {
    mbid: string,
    name: string,
    url: string 
  }
  duration: number,
  image: {
    "#text": string,
    size: "small" | "medium" | "large" | "extralarge"
  }[]
  mbid: string,
  name: string,
  playcount: number,
  streamable: {
    fulltrack: string,
    "#text": string
  },
  url: string
}