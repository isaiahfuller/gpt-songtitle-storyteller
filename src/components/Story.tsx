import { useState, useEffect } from "react";
interface StoryProps {
  trackNames: string[];
}
export default function Story(props: StoryProps) {
  const [status, setStatus] = useState<number>(0);
  const [story, setStory] = useState<string>("");
  const [usedPhrases, setUsedPhrases] = useState<string[]>([]);
  const [unusedPhrases, setUnusedPhrases] = useState<string[]>([]);
  const trackNames: string[] = props.trackNames;

  useEffect(() => {
    try {
      setStatus(0);
      fetch("/storyteller/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackNames: trackNames }),
      })
        .then((res) => res.json())
        .then((res) => {
          setStory(res.story.replace(/\\n/g, "\n"));
          setUsedPhrases(res.usedPhrases);
          setUnusedPhrases(res.unusedPhrases);
          setStatus(100);
        })
        .catch((error) => {
          if(error) {
            console.log(error)
            setStatus(1)
          }
        });
    } catch (e) {
      setStatus(2);
    }
  }, [trackNames]);

  if (status === 0) return <p>Loading - can take a while...</p>;
  if (status === 1) return <p>Server error</p>;
  if (status === 2) return <p>Other error</p>;
  return (
    <div>
      <h1>Story</h1>
      <p className="story">{story}</p>
      {usedPhrases.length ? (
        <>
          <h2>Used titles</h2>
          <p>{usedPhrases.join(", ")}</p>
        </>
      ) : null}
      {unusedPhrases.length ? (
        <>
          <h2>Unused titles</h2>
          <p>{unusedPhrases.join(", ")}</p>
        </>
      ) : null}
    </div>
  );
}
