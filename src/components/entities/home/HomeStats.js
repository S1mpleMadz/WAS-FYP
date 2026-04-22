const stats = (teachingHours, modules, duties, research) => [
  { label: "Teaching Hours", value: teachingHours.toFixed(1), color: "var(--col-accent)" },
  { label: "Modules",        value: modules,                  color: "var(--col-success)" },
  { label: "Duties",         value: duties,                   color: "var(--col-warning)" },
  { label: "Research Items", value: research,                  color: "#8b5cf6" },
];

export default function HomeStats({ teachingHours, modules, duties, research }) {
  return (
    <div className="homeStats">
      {stats(teachingHours, modules, duties, research).map(({ label, value, color }) => (
        <div className="homeStat" key={label} style={{ borderTop: `3px solid ${color}` }}>
          <span className="homeStatValue" style={{ color }}>{value}</span>
          <span className="homeStatLabel">{label}</span>
        </div>
      ))}
    </div>
  );
}
