import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Navbar,
  Feed,
  VideoDetailCopy,
  ChannelDetail,
  SearchFeed,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetailCopy />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
