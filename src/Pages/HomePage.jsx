import { useState } from "react";
import Filter from "../components/Filter";
import Videos from "../components/Videos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/Slices/videoSlices";
import Loader from "../components/Loader";

export default function HomePage({ sideNavOpen, searchValue }) {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.videos);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const filteredVideos = videos.filter((v) => {
    const matchCategory = filter === "All" || v.category === filter;
    const matchSearch =
      !searchValue ||
      v.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      v.channel?.channelName?.toLowerCase().includes(searchValue.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
    {loading && <Loader/>}
      <Filter
        sideNavOpen={sideNavOpen}
        filter={filter}
        setFilter={setFilter}
        videos={videos}
      />
      <Videos
        sideNavOpen={sideNavOpen}
        videos={filteredVideos}
        loading={loading}
        error={error}
      />
    </>
  );
}
