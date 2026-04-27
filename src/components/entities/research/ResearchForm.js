import "./ResearchForm.css";
import useLoad from "../../api/useLoad.js";
import { useModal } from "../../UI/Modal.js";
import Form from "../../UI/Form.js";
import { Confirm } from "../../UI/Notifications.js";

const defaultResearch = {
  ResearchName: "",
  ResearchDescription: "",
  ResearchEffort: null,
  ResearchUserID: 0,
  StartDate: null,
  EndDate: null,
};

const conformance = {
  html2js: {
    ResearchName:        (v) => (v === "" ? null : v),
    ResearchDescription: (v) => (v === "" ? null : v),
    ResearchEffort:      (v) => (v === "" ? null : parseFloat(v)),
    ResearchUserID:      (v) => (v === "0" ? null : parseInt(v, 10)),
    StartDate:           (v) => (v === "" ? null : v),
    EndDate:             (v) => (v === "" ? null : v),
  },
  js2html: {
    ResearchName:        (v) => (v === null ? "" : v),
    ResearchDescription: (v) => (v === null ? "" : v),
    ResearchEffort:      (v) => (v === null ? "" : String(v)),
    ResearchUserID:      (v) => (v === null ? "0" : String(v)),
    StartDate:           (v) => (v === null ? "" : String(v).slice(0, 10)),
    EndDate:             (v) => (v === null ? "" : String(v).slice(0, 10)),
  },
};

const validation = {
  isValid: {
    ResearchName:        (v) => v && v.trim().length > 0,
    ResearchDescription: () => true,
    ResearchEffort:      (v) => v !== null && !isNaN(v) && v >= 0,
    ResearchUserID:      (v) => v !== null && v > 0,
    StartDate:           (v) => v !== null && v !== "",
    EndDate:             (v) => v !== null && v !== "",
    ResearchID:          () => true,
  },
  errorMessage: {
    ResearchName:        "Research name is required",
    ResearchDescription: "",
    ResearchEffort:      "Effort hours must be 0 or more",
    ResearchUserID:      "Please assign a staff member",
    StartDate:           "Start date is required",
    EndDate:             "End date is required",
    ResearchID:          "",
  },
};

export function ResearchForm({ initialResearch, onCancel, onSubmit }) {
  if (!initialResearch) initialResearch = defaultResearch;
  initialResearch = {
    ...initialResearch,
    StartDate: initialResearch.StartDate ? String(initialResearch.StartDate).slice(0, 10) : null,
    EndDate:   initialResearch.EndDate   ? String(initialResearch.EndDate).slice(0, 10)   : null,
  };

  const confirmText =
    initialResearch === defaultResearch
      ? "Are you sure you want to create this research task?"
      : "Are you sure you want to save these changes?";

  const [users, , loadingUsersMessage] = useLoad("/users");
  const [showConfirm, confirm, openConfirm, closeConfirm] = useModal(false);
  const [research, errors, handleChange, handleSubmit] = Form.useForm(
    initialResearch,
    conformance,
    validation,
    onSubmit,
  );

  return (
    <>
      <Confirm
        show={showConfirm}
        onConfirm={handleSubmit}
        message={confirm}
        onDismiss={closeConfirm}
      />
      <Form onSubmit={() => openConfirm(confirmText)} onCancel={onCancel}>
        <Form.Item label="Research Name" error={errors.ResearchName}>
          <input
            type="text"
            name="ResearchName"
            value={conformance.js2html.ResearchName(research.ResearchName)}
            onChange={handleChange}
            placeholder="e.g. AI Ethics Study"
          />
        </Form.Item>

        <Form.Item label="Description" error={errors.ResearchDescription}>
          <textarea
            name="ResearchDescription"
            value={conformance.js2html.ResearchDescription(research.ResearchDescription)}
            onChange={handleChange}
            placeholder="Brief description of the research..."
            rows={3}
          />
        </Form.Item>

        <Form.Item label="Effort (hrs)" error={errors.ResearchEffort}>
          <input
            type="number"
            name="ResearchEffort"
            min="0"
            step="0.5"
            value={conformance.js2html.ResearchEffort(research.ResearchEffort)}
            onChange={handleChange}
            placeholder="e.g. 200"
          />
        </Form.Item>

        <Form.Item label="Assigned Staff" error={errors.ResearchUserID}>
          {!users ? (
            <p>{loadingUsersMessage}</p>
          ) : (
            <select
              name="ResearchUserID"
              value={conformance.js2html.ResearchUserID(research.ResearchUserID)}
              onChange={handleChange}
            >
              <option value="0" disabled>None selected</option>
              {users.map((user) => (
                <option key={user.UserID} value={user.UserID}>
                  {user.UserFirstname} {user.UserLastname}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Start Date" error={errors.StartDate}>
          <input
            type="date"
            name="StartDate"
            value={conformance.js2html.StartDate(research.StartDate)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="End Date" error={errors.EndDate}>
          <input
            type="date"
            name="EndDate"
            value={conformance.js2html.EndDate(research.EndDate)}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default ResearchForm;
