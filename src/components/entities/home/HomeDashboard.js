import useLoad from "../../api/useLoad.js";
import { useAuth } from "../../auth/AuthContext.js";
import HomeProfile from "./HomeProfile.js";
import HomeWorkload from "./HomeWorkload.js";
import HomeDuties from "./HomeDuties.js";
import "./HomeDashboard.css";

export default function HomeDashboard() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.userID;

  const [userRecord, isUserLoading] = useLoad(userId ? `/users/${userId}` : null);
  const [teaching, isTeachingLoading, teachingMsg] = useLoad(userId ? `/teaching/user/${userId}` : null);
  const [duties, isDutiesLoading, dutiesMsg] = useLoad(userId ? `/userduties/user/${userId}` : null);

  if (isUserLoading) return <div className="homeDashboard"><p>Loading...</p></div>;

  const user = userRecord?.[0];
  if (!user) return <div className="homeDashboard"><p>Could not load user profile.</p></div>;

  return (
    <div className="homeDashboard">
      <h1>Welcome back, <span>{user.UserFirstname}</span></h1>
      <div className="homeGrid">
        <HomeProfile user={user} />
        <div className="homeRight">
          <HomeWorkload
            teaching={teaching}
            isLoading={isTeachingLoading}
            loadingMessage={teachingMsg}
          />
          <HomeDuties
            duties={duties}
            isLoading={isDutiesLoading}
            loadingMessage={dutiesMsg}
          />
        </div>
      </div>
    </div>
  );
}
