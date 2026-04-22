import LeaderboardView from "../entities/leaderboard/LeaderboardView.js";

function Leaderboard() {
  return (
    <section className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Staff ranked by total teaching involvement</p>
      </div>
      <hr className="divider" />
      <LeaderboardView />
    </section>
  );
}

export default Leaderboard;
