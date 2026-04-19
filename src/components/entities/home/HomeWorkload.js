export default function HomeWorkload({ teaching, isLoading, loadingMessage }) {
  if (isLoading) return <div className="homeCard"><p>{loadingMessage}</p></div>;

  const totals = teaching.reduce(
    (acc, t) => ({
      leading: acc.leading + parseFloat(t.TeachingLeading || 0),
      lecturing: acc.lecturing + parseFloat(t.TeachingLecturing || 0),
      workshops: acc.workshops + parseFloat(t.TeachingWorkshops || 0),
      assessing: acc.assessing + parseFloat(t.TeachingAssessing || 0),
      moderation: acc.moderation + parseFloat(t.TeachingModeration || 0),
    }),
    { leading: 0, lecturing: 0, workshops: 0, assessing: 0, moderation: 0 }
  );

  const total = Object.values(totals).reduce((a, b) => a + b, 0);

  const rows = [
    { label: "Leading", value: totals.leading },
    { label: "Lecturing", value: totals.lecturing },
    { label: "Workshops", value: totals.workshops },
    { label: "Assessing", value: totals.assessing },
    { label: "Moderation", value: totals.moderation },
  ];

  return (
    <div className="homeCard">
      <h3>Teaching Workload</h3>
      {total === 0 ? (
        <p className="homeEmpty">No teaching assigned.</p>
      ) : (
        <>
          <div className="workloadRows">
            {rows.map(({ label, value }) => (
              <div className="workloadRow" key={label}>
                <div className="workloadRowLabel">
                  <span>{label}</span>
                  <span>{value.toFixed(1)} hrs</span>
                </div>
                <div className="workloadBar">
                  <div
                    className="workloadBarFill"
                    style={{ width: total > 0 ? `${(value / total) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="workloadTotal">
            <span>Total Effort</span>
            <span>{total.toFixed(1)} hrs</span>
          </div>
        </>
      )}
    </div>
  );
}
