import UserBadge from "../components/Badges";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

export default function Leaderboard() {
  return (
    <div>
      <NavBar />
      <p>This is the leaderboard page</p>
      <UserBadge color="gold" />
      <UserBadge color="silver" />
      <UserBadge color="bronze" />
      <UserBadge color="platinum" />
      <UserBadge color="diamond" />
      <Footer />
    </div>
  );
}
