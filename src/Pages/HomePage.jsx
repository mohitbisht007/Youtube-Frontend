import Filter from "../components/Filter";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Videos from "../components/Videos";

export default function HomePage() {
  return (
    <>
      <Header />
      <Filter/>
      <SideNav />
      <Videos/>
    </>
  );
}
