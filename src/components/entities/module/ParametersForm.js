import Form from "../../UI/Form.js";
import { useModal } from "../../UI/Modal.js";
import { Confirm } from "../../UI/Notifications.js";

export default function ParametersForm({ initialParameters, onCancel, onSubmit }) {
  const conformance = {
    html2js: {
      LeadingMinimum:        (v) => parseFloat(v),
      LeadingMultiplier:     (v) => parseFloat(v),
      LecturingMultiplier:   (v) => parseFloat(v),
      WorkshopSize:          (v) => parseInt(v, 10),
      MarkingTimePerStudent: (v) => parseFloat(v),
      WeeksPer15Credits:     (v) => parseInt(v, 10),
      WeeksPer30Credits:     (v) => parseInt(v, 10),
      LectureHoursPerWeek:   (v) => parseFloat(v),
      WorkshopHoursPerWeek:  (v) => parseFloat(v),
    },
    js2html: {
      LeadingMinimum:        (v) => String(v ?? ""),
      LeadingMultiplier:     (v) => String(v ?? ""),
      LecturingMultiplier:   (v) => String(v ?? ""),
      WorkshopSize:          (v) => String(v ?? ""),
      MarkingTimePerStudent: (v) => String(v ?? ""),
      WeeksPer15Credits:     (v) => String(v ?? ""),
      WeeksPer30Credits:     (v) => String(v ?? ""),
      LectureHoursPerWeek:   (v) => String(v ?? ""),
      WorkshopHoursPerWeek:  (v) => String(v ?? ""),
    },
  };

  const validation = {
    isValid: {
      ParameterID:           () => true,
      LeadingMinimum:        (v) => !isNaN(v) && v >= 0,
      LeadingMultiplier:     (v) => !isNaN(v) && v >= 0,
      LecturingMultiplier:   (v) => !isNaN(v) && v >= 0,
      WorkshopSize:          (v) => !isNaN(v) && v > 0,
      MarkingTimePerStudent: (v) => !isNaN(v) && v >= 0,
      WeeksPer15Credits:     (v) => !isNaN(v) && v > 0,
      WeeksPer30Credits:     (v) => !isNaN(v) && v > 0,
      LectureHoursPerWeek:   (v) => !isNaN(v) && v >= 0,
      WorkshopHoursPerWeek:  (v) => !isNaN(v) && v >= 0,
    },
    errorMessage: {
      ParameterID:           "",
      LeadingMinimum:        "Must be a valid non-negative number",
      LeadingMultiplier:     "Must be a valid non-negative number",
      LecturingMultiplier:   "Must be a valid non-negative number",
      WorkshopSize:          "Must be a positive integer",
      MarkingTimePerStudent: "Must be a valid non-negative number",
      WeeksPer15Credits:     "Must be a positive integer",
      WeeksPer30Credits:     "Must be a positive integer",
      LectureHoursPerWeek:   "Must be a valid non-negative number",
      WorkshopHoursPerWeek:  "Must be a valid non-negative number",
    },
  };

  const [showConfirm, confirmMsg, openConfirm, closeConfirm] = useModal(false);
  const [params, errors, handleChange, handleSubmit] = Form.useForm(
    initialParameters,
    conformance,
    validation,
    onSubmit,
  );

  const numField = (name, label) => (
    <Form.Item label={label} error={errors[name]}>
      <input
        type="number"
        step="any"
        name={name}
        value={conformance.js2html[name](params[name])}
        onChange={handleChange}
      />
    </Form.Item>
  );

  return (
    <>
      <Confirm
        show={showConfirm}
        onConfirm={handleSubmit}
        message={confirmMsg}
        onDismiss={closeConfirm}
      />
      <Form onSubmit={() => openConfirm("Are you sure you want to save these parameter changes?")} onCancel={onCancel}>
        {numField("LeadingMinimum",        "Leading Minimum (%)")}
        {numField("LeadingMultiplier",     "Leading Multiplier")}
        {numField("LecturingMultiplier",   "Lecturing Multiplier")}
        {numField("WorkshopSize",          "Workshop Size (students)")}
        {numField("MarkingTimePerStudent", "Marking Time Per Student (hrs)")}
        {numField("WeeksPer15Credits",     "Weeks Per 15 Credits")}
        {numField("WeeksPer30Credits",     "Weeks Per 30 Credits")}
        {numField("LectureHoursPerWeek",   "Lecture Hours Per Week")}
        {numField("WorkshopHoursPerWeek",  "Workshop Hours Per Week")}
      </Form>
    </>
  );
}
