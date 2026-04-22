export default function HomeResearch({ research, isLoading, loadingMessage }) {
  if (isLoading) return <div className="homeCard"><p>{loadingMessage}</p></div>;

  const totalEffort = research.reduce((sum, r) => sum + parseFloat(r.ResearchEffort || 0), 0);

  return (
    <div className="homeCard">
      <h3>My Research</h3>
      {research.length === 0 ? (
        <p className="homeEmpty">No research assigned.</p>
      ) : (
        <>
          <div className="dutiesList">
            {research.map((r) => (
              <div className="dutyRow" key={r.ResearchID}>
                <span className="dutyName">{r.ResearchName}</span>
                <span className="dutyEffort">{parseFloat(r.ResearchEffort || 0).toFixed(1)} hrs</span>
              </div>
            ))}
          </div>
          <div className="dutiesTotal">
            <span>Total Effort</span>
            <span>{totalEffort.toFixed(1)} hrs</span>
          </div>
        </>
      )}
    </div>
  );
}
