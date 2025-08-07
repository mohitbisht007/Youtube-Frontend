import ChannelPage from "./Pages/ChannelPage";
import HomePage from "./Pages/HomePage";
import VideoPage from "./Pages/VideoPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/@NeonMan" element={<ChannelPage />} />
      </Routes>
    </>
  );
}
