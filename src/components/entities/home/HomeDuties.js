export default function HomeDuties({ duties, isLoading, loadingMessage }) {
  if (isLoading) return <div className="homeCard"><p>{loadingMessage}</p></div>;

  const totalEffort = duties.reduce((sum, d) => sum + parseFloat(d.DutyEffort || 0), 0);

  return (
    <div className="homeCard">
      <h3>My Duties</h3>
      {duties.length === 0 ? (
        <p className="homeEmpty">No duties assigned.</p>
      ) : (
        <>
          <div className="dutiesList">
            {duties.map((duty) => (
              <div className="dutyRow" key={duty.UserDutyID}>
                <span className="dutyName">{duty.DutyName}</span>
                <span className="dutyEffort">{parseFloat(duty.DutyEffort).toFixed(1)} hrs</span>
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
