export async function calculateModuleEffort(moduleData) {
  if (!moduleData) {
    return 0;
  }

  try {
    const response = await fetch("https://softwarehub.uk/unibase/WAS/api/parameters");
    const parametersArray = await response.json();
    const effortConfig = parametersArray[0];

    const { ModuleSize, ModuleCredits } = moduleData;

    const markingEffort = ModuleSize * effortConfig.MarkingTimePerStudent;

    const numberOfWeeklyWorkshops = Math.ceil(ModuleSize / effortConfig.WorkshopSize);
    const teachingWeeks = ModuleCredits === 15 ? effortConfig.WeeksPer15Credits : effortConfig.WeeksPer30Credits;
    const workshopEffort =
      effortConfig.WorkshopMultiplier * teachingWeeks * effortConfig.WorkshopHoursPerWeek * numberOfWeeklyWorkshops;

    const lecturingEffort = effortConfig.LecturingMultiplier * teachingWeeks * effortConfig.LectureHoursPerWeek;

    const moduleLeadingEffort = Math.max(effortConfig.LeadingMinimum, effortConfig.LeadingMultiplier * ModuleSize);

    const totalEffort = Math.round(moduleLeadingEffort + lecturingEffort + workshopEffort + markingEffort);

    return totalEffort;
  } catch (error) {
    console.error("Error fetching parameters:", error);
    return 0;
  }
}
