import useLoad from "../../api/useLoad.js";
import "./LeaderboardView.css";

export default function LeaderboardView() {
  const [users, isUsersLoading] = useLoad("/users");
  const [teaching, isTeachingLoading] = useLoad("/teaching");

  if (isUsersLoading || isTeachingLoading) {
    return <div className="leaderboard"><p>Loading leaderboard...</p></div>;
  }

  const totalsMap = {};
  (teaching || []).forEach((t) => {
    const uid = t.UserID;
    if (!totalsMap[uid]) totalsMap[uid] = 0;
    totalsMap[uid] +=
      parseFloat(t.TeachingLeading || 0) +
      parseFloat(t.TeachingLecturing || 0) +
      parseFloat(t.TeachingWorkshops || 0) +
      parseFloat(t.TeachingAssessing || 0) +
      parseFloat(t.TeachingModeration || 0);
  });

  const ranked = (users || [])
    .map((u) => ({ ...u, total: totalsMap[u.UserID] || 0 }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="leaderboard">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="lb-rank">#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th className="lb-total">Total Teaching (%)</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((user, i) => (
            <tr key={user.UserID} className={i < 3 ? `lb-top lb-top-${i + 1}` : ""}>
              <td className="lb-rank">{i + 1}</td>
              <td>
                <span className="lb-name">
                  {user.UserTitle ? `${user.UserTitle} ` : ""}
                  {user.UserFirstname} {user.UserLastname}
                </span>
              </td>
              <td>{user.DepartmentName || "—"}</td>
              <td>{user.PositionName || "—"}</td>
              <td className="lb-total">{user.total.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
