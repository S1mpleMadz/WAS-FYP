import API from "../../api/API.js";

export async function calculateModuleEffort(moduleData) {
  if (!moduleData) return 0;

  try {
    const result = await API.get("/parameters");
    if (!result.isSuccess || !result.result || result.result.length === 0) return 0;

    const p = result.result[0];
    const { ModuleSize, ModuleCredits } = moduleData;

    const markingEffort = ModuleSize * parseFloat(p.MarkingTimePerStudent);

    const numberOfWeeklyWorkshops = Math.ceil(ModuleSize / p.WorkshopSize);
    const teachingWeeks = ModuleCredits === 15 ? p.WeeksPer15Credits : p.WeeksPer30Credits;
    const workshopMultiplier = isNaN(parseFloat(p.WorkshopMultiplier))
      ? 1
      : parseFloat(p.WorkshopMultiplier);
    const workshopEffort =
      workshopMultiplier *
      teachingWeeks *
      parseFloat(p.WorkshopHoursPerWeek) *
      numberOfWeeklyWorkshops;

    const lecturingEffort =
      parseFloat(p.LecturingMultiplier) * teachingWeeks * parseFloat(p.LectureHoursPerWeek);

    const moduleLeadingEffort = Math.max(
      parseFloat(p.LeadingMinimum),
      parseFloat(p.LeadingMultiplier) * ModuleSize,
    );

    return Math.round(moduleLeadingEffort + lecturingEffort + workshopEffort + markingEffort);
  } catch {
    return 0;
  }
}
