import "./DutyForm.css";
import { useModal } from "../../UI/Modal.js";
import Form from "../../UI/Form.js";
import { Confirm } from "../../UI/Notifications.js";

const defaultDuty = {
  DutyName: "",
  DutyEffort: null,
  DutyInstances: null,
};

const conformance = {
  html2js: {
    DutyName:      (v) => (v === "" ? null : v),
    DutyEffort:    (v) => (v === "" ? null : parseFloat(v)),
    DutyInstances: (v) => (v === "" ? null : parseInt(v, 10)),
  },
  js2html: {
    DutyName:      (v) => (v === null ? "" : v),
    DutyEffort:    (v) => (v === null ? "" : String(v)),
    DutyInstances: (v) => (v === null ? "" : String(v)),
  },
};

const validation = {
  isValid: {
    DutyName:      (v) => v && v.trim().length > 0,
    DutyEffort:    (v) => v !== null && !isNaN(v) && v >= 0,
    DutyInstances: (v) => v !== null && Number.isInteger(v) && v >= 1,
    DutyID:        () => true,
  },
  errorMessage: {
    DutyName:      "Duty name is required",
    DutyEffort:    "Effort hours must be 0 or more",
    DutyInstances: "At least 1 instance is required",
    DutyID:        "",
  },
};

export function DutyForm({ initialDuty, onCancel, onSubmit }) {
  if (!initialDuty) initialDuty = defaultDuty;

  const confirmText =
    initialDuty === defaultDuty
      ? "Are you sure you want to create this duty?"
      : "Are you sure you want to save these changes?";

  const [showConfirm, confirm, openConfirm, closeConfirm] = useModal(false);
  const [duty, errors, handleChange, handleSubmit] = Form.useForm(
    initialDuty,
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
        <Form.Item label="Duty Name" error={errors.DutyName}>
          <input
            type="text"
            name="DutyName"
            value={conformance.js2html.DutyName(duty.DutyName)}
            onChange={handleChange}
            placeholder="e.g. Head of School"
          />
        </Form.Item>

        <Form.Item label="Effort (hrs)" error={errors.DutyEffort}>
          <input
            type="number"
            name="DutyEffort"
            min="0"
            step="0.5"
            value={conformance.js2html.DutyEffort(duty.DutyEffort)}
            onChange={handleChange}
            placeholder="e.g. 700"
          />
        </Form.Item>

        <Form.Item label="Instances" error={errors.DutyInstances}>
          <input
            type="number"
            name="DutyInstances"
            min="1"
            step="1"
            value={conformance.js2html.DutyInstances(duty.DutyInstances)}
            onChange={handleChange}
            placeholder="e.g. 1"
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default DutyForm;
