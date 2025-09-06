import { lazy, Suspense } from "react";

const ChannelPage = lazy(() => import("./Pages/ChannelPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const VideoPage = lazy(() => import("./Pages/VideoPage"));
import { Route, Routes } from "react-router-dom";
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const UploadVideoPage = lazy(() => import("./Pages/UploadVideoPage"));
const CreateChannelPage = lazy(() => import("./Pages/CreateChannelPage"));
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import { useState } from "react";
import store from "./redux/store";
const CustomizeChannelPage = lazy(() => import("./Pages/CustomizeChannelPage"));
const EditSingleVideoPage = lazy(() => import("./Pages/EditSingleVideoPage"));
const EditVideosPage = lazy(() => import("./Pages/EditVideosPage"));
const EditUserPage = lazy(() => import("./Pages/EditUserPage"));
import Loader from "./components/Loader";

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
      <Suspense fallback={<Loader/>}>
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
      </Suspense>
    </>
  );
}
