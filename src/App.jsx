import ChannelPage from "./Pages/ChannelPage";
import HomePage from "./Pages/HomePage";
import VideoPage from "./Pages/VideoPage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import UploadVideoPage from "./Pages/UploadVideoPage";
import CreateChannelPage from "./Pages/CreateChannelPage";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import { useState } from "react";
import store from "./redux/store";
import CustomizeChannelPage from "./Pages/CustomizeChannelPage";
import EditSingleVideoPage from "./Pages/EditSingleVideoPage";
import EditVideosPage from "./Pages/EditVideosPage";
import EditUserPage from "./Pages/EditUserPage";


export default function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  window.addEventListener("storage", (event) => {
    if (event.key === "user" && event.newValue === null) {
      store.dispatch({ type: "user/logout" });
    }
  });

  return (
    <>
      <Header
        onHamburgerClick={() => setSideNavOpen((prev) => !prev)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <SideNav open={sideNavOpen} onClose={() => setSideNavOpen(false)} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage sideNavOpen={sideNavOpen} searchValue={searchValue} />
          }
        />
        <Route path="/watch/:id" element={<VideoPage />} />
        <Route path="/edit-user" element={<EditUserPage />} />
        <Route path="/channel/:channelHandle" element={<ChannelPage />} />
        <Route
          path="/customize-channel/:channelHandle"
          element={<CustomizeChannelPage />}
        />
        <Route path="/login" element={<SignupPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
        <Route path="/create-channel" element={<CreateChannelPage />} />
        <Route
          path="/channel/:channelHandle/edit-videos"
          element={<EditVideosPage />}
        />
        <Route path="/edit-video/:videoId" element={<EditSingleVideoPage />} />
      </Routes>
    </>
  );
}
