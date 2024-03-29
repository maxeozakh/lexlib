import { useGlobalStore } from "../../state/store";
import { Card } from "../../ui/Card/Card";
import "./SearchResults.css";

export const SearchResults = () => {
  const searchResults = useGlobalStore((state) => state.searchResults);
  return (
    <div className="searchResults">
      {searchResults.map((result) => (
        <Card
          episodeNumber={result.episodeNumber}
          id={result.id}
          person={result.person}
          linkToEpisode={result.linkToEpisode}
          timestamp={result.timestamp}
          linkToTimestamp={result.linkToTimestamp}
          topicTitle={result.topicTitle}
        />
      ))}
    </div>
  );
};
