import { SearchBar } from "../features/SearchBar/SearchBar";
import { SearchResults } from "../features/SearchResults/SearchResults";
import "./App.css";

function App() {
  return (
    <>
      <h1>Lex library</h1>
      <SearchBar />
      <SearchResults />
    </>
  );
}

export default App;
