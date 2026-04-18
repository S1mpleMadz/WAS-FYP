import "./ModuleForm.css";
import useLoad from "../../api/useLoad.js";
import { useModal } from "../../UI/Modal.js";
import Form from "../../UI/Form.js";
import { Confirm } from "../../UI/Notifications.js";

const defaultModule = {
  ModuleCode: "",
  ModuleName: "",
  DepartmentID: 0,
  LeaderID: 0,
  ModuleLevel: 0,
  ModuleCredits: 0,
};

export function ModuleForm({ initialModule, onCancel, onSubmit }) {
  const conformance = {
    html2js: {
      ModuleCode:    (v) => (v === "" ? null : v),
      ModuleName:    (v) => (v === "" ? null : v),
      DepartmentID:  (v) => (v === "0" ? null : parseInt(v, 10)),
      LeaderID:      (v) => (v === "0" ? null : parseInt(v, 10)),
      ModuleLevel:   (v) => (v === "0" ? null : parseInt(v, 10)),
      ModuleCredits: (v) => (v === "0" ? null : parseInt(v, 10)),
    },
    js2html: {
      ModuleCode:    (v) => (v === null ? "" : v),
      ModuleName:    (v) => (v === null ? "" : v),
      DepartmentID:  (v) => (v === null ? "0" : String(v)),
      LeaderID:      (v) => (v === null ? "0" : String(v)),
      ModuleLevel:   (v) => (v === null ? "0" : String(v)),
      ModuleCredits: (v) => (v === null ? "0" : String(v)),
    },
  };

  const validation = {
    isValid: {
      ModuleCode:    (v) => v && v.trim().length > 0,
      ModuleName:    (v) => v && v.trim().length > 0,
      DepartmentID:  (v) => v !== null && v > 0,
      LeaderID:      (v) => v !== null && v > 0,
      ModuleLevel:   (v) => v !== null && v > 0,
      ModuleCredits: (v) => v !== null && v > 0,
      ModuleID:      () => true,
    },
    errorMessage: {
      ModuleCode:    "Module code is required",
      ModuleName:    "Module name is required",
      DepartmentID:  "Please select a department",
      LeaderID:      "Please select a module leader",
      ModuleLevel:   "Please select a level",
      ModuleCredits: "Please select credits",
      ModuleID:      "",
    },
  };

  if (!initialModule) initialModule = defaultModule;

  const confirmText =
    initialModule === defaultModule
      ? "Are you sure you want to create this module?"
      : "Are you sure you want to save these changes?";

  const [departments, , loadingDepartmentsMessage] = useLoad("/departments");
  const [users, , loadingUsersMessage] = useLoad("/users");

  const [showConfirm, confirm, openConfirm, closeConfirm] = useModal(false);
  const [module, errors, handleChange, handleSubmit] = Form.useForm(
    initialModule,
    conformance,
    validation,
    onSubmit,
  );

  const levels = [4, 5, 6, 7];
  const credits = [15, 30];

  return (
    <>
      <Confirm
        show={showConfirm}
        onConfirm={handleSubmit}
        message={confirm}
        onDismiss={closeConfirm}
      />
      <Form onSubmit={() => openConfirm(confirmText)} onCancel={onCancel}>
        <Form.Item label="Module Code" error={errors.ModuleCode}>
          <input
            type="text"
            name="ModuleCode"
            value={conformance.js2html.ModuleCode(module.ModuleCode)}
            onChange={handleChange}
            placeholder="e.g. CS4000"
          />
        </Form.Item>

        <Form.Item label="Module Name" error={errors.ModuleName}>
          <input
            type="text"
            name="ModuleName"
            value={conformance.js2html.ModuleName(module.ModuleName)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Department" error={errors.DepartmentID}>
          {!departments ? (
            <p>{loadingDepartmentsMessage}</p>
          ) : (
            <select
              name="DepartmentID"
              value={conformance.js2html.DepartmentID(module.DepartmentID)}
              onChange={handleChange}
            >
              <option value="0" disabled>None selected</option>
              {departments.map((dep) => (
                <option key={dep.DepartmentID} value={dep.DepartmentID}>
                  {dep.DepartmentName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Module Leader" error={errors.LeaderID}>
          {!users ? (
            <p>{loadingUsersMessage}</p>
          ) : (
            <select
              name="LeaderID"
              value={conformance.js2html.LeaderID(module.LeaderID)}
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

        <Form.Item label="Level" error={errors.ModuleLevel}>
          <select
            name="ModuleLevel"
            value={conformance.js2html.ModuleLevel(module.ModuleLevel)}
            onChange={handleChange}
          >
            <option value="0" disabled>None selected</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                Level {level}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="Credits" error={errors.ModuleCredits}>
          <select
            name="ModuleCredits"
            value={conformance.js2html.ModuleCredits(module.ModuleCredits)}
            onChange={handleChange}
          >
            <option value="0" disabled>None selected</option>
            {credits.map((credit) => (
              <option key={credit} value={credit}>
                {credit} credits
              </option>
            ))}
          </select>
        </Form.Item>
      </Form>
    </>
  );
}

export default ModuleForm;
