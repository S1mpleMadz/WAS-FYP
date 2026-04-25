import useLoad from "../../api/useLoad.js";
import { useAuth } from "../../auth/AuthContext.js";
import HomeProfile from "./HomeProfile.js";
import HomeWorkload from "./HomeWorkload.js";
import HomeDuties from "./HomeDuties.js";
import HomeStats from "./HomeStats.js";
import HomeResearch from "./HomeResearch.js";
import "./HomeDashboard.css";

const TODAY = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function HomeDashboard() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.userID;

  const [userRecord, isUserLoading] = useLoad(userId ? `/users/${userId}` : null);
  const [teaching, isTeachingLoading, teachingMsg] = useLoad(userId ? `/teaching/user/${userId}` : null);
  const [duties, isDutiesLoading, dutiesMsg] = useLoad(userId ? `/userduties/user/${userId}` : null);
  const [research, isResearchLoading, researchMsg] = useLoad(userId ? `/research/user/${userId}` : null);

  if (isUserLoading) return <div className="homeDashboard"><p>Loading...</p></div>;

  const user = userRecord?.[0];
  if (!user) return <div className="homeDashboard"><p>Could not load user profile.</p></div>;

  const teachingTotal = teaching.reduce(
    (sum, t) =>
      sum +
      parseFloat(t.TeachingLeading || 0) +
      parseFloat(t.TeachingLecturing || 0) +
      parseFloat(t.TeachingWorkshops || 0) +
      parseFloat(t.TeachingAssessing || 0) +
      parseFloat(t.TeachingModeration || 0),
    0
  );

  return (
    <div className="homeDashboard">
      <div className="homeHero">
        <h1>Welcome back, <span>{user.UserFirstname}</span></h1>
        <p className="homeHeroDate">{TODAY}</p>
      </div>

      <HomeStats
        teachingHours={teachingTotal}
        modules={teaching.length}
        duties={duties.length}
        research={research.length}
      />

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
          <HomeResearch
            research={research}
            isLoading={isResearchLoading}
            loadingMessage={researchMsg}
          />
        </div>
      </div>
    </div>
  );
}
