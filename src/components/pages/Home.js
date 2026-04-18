import { useAuth } from "../auth/AuthContext.js";
import LoggedInUser from "../entities/home/homePage.js";

function Home() {
  const { loggedInUser } = useAuth();
  return (
    <>
      <h1>Homepage</h1>
      <LoggedInUser user={loggedInUser} />
    </>
  );
}

export default Home;
