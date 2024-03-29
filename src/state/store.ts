import { create } from "zustand";
import rawData from "../../data/data.json";

interface Chapter {
  title: string;
  time: number;
}

interface Data {
  episode: number;
  videoId: string;
  title: string;
  response: Chapter[];
}

export interface SearchResult {
  episodeNumber: number;
  id: string;
  person: string;
  linkToEpisode: string;
  timestamp: number;
  linkToTimestamp: string;
  topicTitle: string;
}

interface State {
  data: Data[];
  searchResults: SearchResult[];
  filterDataByTopic: (topic: string) => void;
  searchRequest: string;
  setSearchRequest: (searchRequest: string) => void;
}

export const useGlobalStore = create<State>()((set) => ({
  searchRequest: "",
  data: rawData,
  searchResults: [],
  setSearchRequest: (searchRequest) => {
    set({ searchRequest });
  },
  filterDataByTopic: (topic) => {
    if (topic.length < 2) {
      set({ searchResults: [] });
      return;
    }

    const lowerCaseTopic = topic.toLowerCase();
    const results = rawData
      .filter((d) => {
        return d.response.some((c) =>
          c.title.toLowerCase().includes(lowerCaseTopic)
        );
      })
      .map((d) => {
        return d.response
          .filter((c) => c.title.toLowerCase().includes(lowerCaseTopic))
          .map((c) => ({
            id: `${d.episode}-${c.time}`,
            person: d.title,
            linkToEpisode: `https://www.youtube.com/watch?v=${d.videoId}`,
            timestamp: c.time,
            linkToTimestamp: `https://www.youtube.com/watch?v=${d.videoId}&t=${c.time}`,
            topicTitle: c.title,
            episodeNumber: d.episode,
          }));
      })
      .flat();
    set({ searchResults: results });
  },
}));
