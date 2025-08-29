import { useState } from "react";
import Filter from "../components/Filter";
import Videos from "../components/Videos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../redux/Slices/videoSlices";

export default function HomePage({ sideNavOpen }) {
  const dispatch = useDispatch()
  const {videos, loading, error} = useSelector((state) => state.videos)
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchVideos())
  }, [dispatch]);

  return (
    <>
      <Filter
        sideNavOpen={sideNavOpen}
        filter={filter}
        setFilter={setFilter}
        videos={videos}
      />
      <Videos
        sideNavOpen={sideNavOpen}
        videos={
          filter === "All"
            ? videos
            : videos.filter((v) => v.category === filter)
        }
        loading={loading}
        error= {error}
      />
    </>
  );
}
