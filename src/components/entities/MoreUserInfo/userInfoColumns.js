export const teachingColumns = [
  {
    header: "Module",
    key: "ModuleName",
    render: (row) => `${row.ModuleCode} – ${row.ModuleName}`,
  },
  {
    header: "Leading %",
    key: "TeachingLeading",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingLeading)}%`,
  },
  {
    header: "Lecturing %",
    key: "TeachingLecturing",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingLecturing)}%`,
  },
  {
    header: "Workshops %",
    key: "TeachingWorkshops",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingWorkshops)}%`,
  },
  {
    header: "Assessing %",
    key: "TeachingAssessing",
    className: "center",
    render: (row) => `${parseFloat(row.TeachingAssessing)}%`,
  },
  {
    header: "Moderation",
    key: "TeachingModeration",
    className: "center",
    render: (row) => (parseFloat(row.TeachingModeration) !== 0 ? "Yes" : "No"),
  },
];

export const dutyColumns = [
  { header: "Duty Name", key: "DutyName" },
  {
    header: "Effort (hrs)",
    key: "DutyEffort",
    className: "center",
    render: (row) => `${parseFloat(row.DutyEffort)} hrs`,
  },
];

export const researchColumns = [
  { header: "Research Name", key: "ResearchName" },
  { header: "Description", key: "ResearchDescription" },
  {
    header: "Effort (hrs)",
    key: "ResearchEffort",
    className: "center",
    render: (row) => `${parseFloat(row.ResearchEffort)} hrs`,
  },
  {
    header: "Start Date",
    key: "StartDate",
    className: "center",
    render: (row) => new Date(row.StartDate).toLocaleDateString(),
  },
  {
    header: "End Date",
    key: "EndDate",
    className: "center",
    render: (row) => new Date(row.EndDate).toLocaleDateString(),
  },
];
