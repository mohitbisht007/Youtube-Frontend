import Filter from "../components/Filter";
import Videos from "../components/Videos";

export default function HomePage({ sideNavOpen }) {
  return (
    <>
      <Filter sideNavOpen={sideNavOpen} />
      <Videos sideNavOpen={sideNavOpen} />
    </>
  );
}