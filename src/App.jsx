import ChannelPage from "./Pages/ChannelPage";
import HomePage from "./Pages/HomePage";
import VideoPage from "./Pages/VideoPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import UploadVideoPage from "./Pages/UploadVideoPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<VideoPage />} />
        <Route path="/@NeonMan" element={<ChannelPage />} />
        <Route path="/login" element={<SignupPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Routes>
    </>
  );
}
