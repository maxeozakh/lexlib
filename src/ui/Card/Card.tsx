import { SearchResult, useGlobalStore } from "../../state/store";
import "./Card.css";

// GPT generated:
function convertTimestampToHMS(timestamp: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = timestamp % 60;

  // Format each part to ensure it has two digits
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Combine the parts into a final string
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const Card = ({
  person,
  linkToEpisode,
  timestamp,
  linkToTimestamp,
  topicTitle,
  episodeNumber,
}: SearchResult) => {
  const { searchRequest } = useGlobalStore();
  const getHighlightedText = (text: string) => {
    const parts = text.split(new RegExp(`(${searchRequest})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            style={
              part.toLowerCase() === searchRequest.toLowerCase()
                ? { fontWeight: "bold", color: "red" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="card d-flex justify-between w100">
      <div>
        <a href={linkToEpisode}>#{episodeNumber}</a> <span>{person}: </span>
        <span>{getHighlightedText(topicTitle)}</span>
      </div>

      <div className="timestampWrapper">
        <span>
          <a href={linkToTimestamp}>{convertTimestampToHMS(timestamp)}</a>
        </span>
      </div>
    </div>
  );
};
