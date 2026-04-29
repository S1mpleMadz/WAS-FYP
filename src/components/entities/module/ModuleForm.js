import "./ModuleForm.css";
import useLoad from "../../api/useLoad.js";
import { useModal } from "../../UI/Modal.js";
import Form from "../../UI/Form.js";
import { Confirm } from "../../UI/Notifications.js";
import { defaultModule, conformance, validation, levels, credits } from "./moduleFormConfig.js";

export function ModuleForm({ initialModule, onCancel, onSubmit }) {
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

        <Form.Item label="Module Leader" error={errors.ModuleLeaderID}>
          {!users ? (
            <p>{loadingUsersMessage}</p>
          ) : (
            <select
              name="ModuleLeaderID"
              value={conformance.js2html.ModuleLeaderID(module.ModuleLeaderID)}
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
