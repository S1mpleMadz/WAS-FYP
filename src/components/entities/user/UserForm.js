import { useState } from "react";
import "./UserForm.css";
import useLoad from "../../api/useLoad.js";
import { useModal } from "../../UI/Modal.js";
import Form from "../../UI/Form.js";
import { Confirm } from "../../UI/Notifications.js";

const defaultUser = {
  UserTitle: "",
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserImageURL: "",
  UserTypeID: 0,
  PositionID: 0,
  DepartmentID: 0,
  WorkStatusID: 0,
};

export function UserForm({ initialUser, onCancel, onSubmit }) {
  const conformance = {
    html2js: {
      UserTitle: (value) => (value === "" ? null : value),
      UserFirstname: (value) => (value === "" ? null : value),
      UserLastname: (value) => (value === "" ? null : value),
      UserEmail: (value) => (value === "" ? null : value),
      UserImageURL: (value) => (value === "" ? null : value),
      UserTypeID: (value) => (value === "0" ? null : parseInt(value, 10)),
      PositionID: (value) => (value === "0" ? null : parseInt(value, 10)),
      DepartmentID: (value) => (value === "0" ? null : parseInt(value, 10)),
      WorkStatusID: (value) => (value === "0" ? null : parseInt(value, 10)),
    },
    js2html: {
      UserTitle: (value) => (value === null ? "" : value),
      UserFirstname: (value) => (value === null ? "" : value),
      UserLastname: (value) => (value === null ? "" : value),
      UserEmail: (value) => (value === null ? "" : value),
      UserImageURL: (value) => (value === null ? "" : value),
      UserTypeID: (value) => (value === null ? "0" : String(value)),
      PositionID: (value) => (value === null ? "0" : String(value)),
      DepartmentID: (value) => (value === null ? "0" : String(value)),
      WorkStatusID: (value) => (value === null ? "0" : String(value)),
    },
  };

  const validation = {
    isValid: {
      UserTitle: () => true,
      UserFirstname: (value) => value && value.trim().length > 0,
      UserLastname: (value) => value && value.trim().length > 0,
      UserEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      UserImageURL: (value) =>
        value === "" ||
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
          value,
        ),
      UserTypeID: (value) => value !== null && value > 0,
      PositionID: (value) => value !== null && value > 0,
      DepartmentID: (value) => value !== null && value > 0,
      WorkStatusID: (value) => value !== null && value > 0,
      UserID: () => true,
    },
    errorMessage: {
      UserTitle: "Please select a valid title",
      UserFirstname: "First name is required",
      UserLastname: "Last name is required",
      UserEmail: "Please enter a valid email address",
      UserImageURL: "Please enter a valid URL or leave blank",
      UserTypeID: "Please select a valid user type",
      PositionID: "Please select a valid position",
      DepartmentID: "Please select a valid department",
      WorkStatusID: "Please select a valid work status",
      UserID: "",
    },
  };

  const isCreating = !initialUser || !initialUser.UserID;
  if (!initialUser) initialUser = defaultUser;

  let confirmText = isCreating
    ? "Are you sure you want to create this user?"
    : "Are you sure you want to make this change?";

  const [userTypes, , loadingUserTypesMessage] = useLoad(`/usertypes`);
  const [positions, , loadingPositionsMessage] = useLoad(`/positions`);
  const [departments, , loadingDepartmentsMessage] = useLoad(`/departments`);
  const [workStatuses, , loadingWorkStatusesMessage] = useLoad(`/workstatus`);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [showConfirm, confirm, openConfirm, closeConfirm] = useModal(false);
  const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initialUser,
    conformance,
    validation,
    (userData) => onSubmit(userData, password),
  );

  const confirmSubmit = () => {
    if (isCreating && password.trim().length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordError(null);
    openConfirm(confirmText);
  };

  const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];

  return (
    <>
      <Confirm
        show={showConfirm}
        onConfirm={handleSubmit}
        message={confirm}
        onDismiss={closeConfirm}
      />
      <Form onSubmit={confirmSubmit} onCancel={onCancel}>
        <Form.Item label="Title" error={errors.UserTitle}>
          <select
            name="UserTitle"
            value={conformance.js2html.UserTitle(user.UserTitle)}
            onChange={handleChange}
          >
            <option value="">None selected</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="First Name" error={errors.UserFirstname}>
          <input
            type="text"
            name="UserFirstname"
            value={conformance.js2html.UserFirstname(user.UserFirstname)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Last Name" error={errors.UserLastname}>
          <input
            type="text"
            name="UserLastname"
            value={conformance.js2html.UserLastname(user.UserLastname)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Email" error={errors.UserEmail}>
          <input
            type="email"
            name="UserEmail"
            value={conformance.js2html.UserEmail(user.UserEmail)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="User Type" error={errors.UserTypeID}>
          {!userTypes ? (
            <p>{loadingUserTypesMessage}</p>
          ) : (
            <select
              name="UserTypeID"
              value={conformance.js2html.UserTypeID(user.UserTypeID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {userTypes.map((type) => {
                const typeId =
                  type.UserTypeID || type.UsertypeID || type.TypeID;
                const typeName =
                  type.TypeName || type.UserTypeName || type.UsertypeName;

                return (
                  <option key={typeId} value={typeId}>
                    {typeName}
                  </option>
                );
              })}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Position" error={errors.PositionID}>
          {!positions ? (
            <p>{loadingPositionsMessage}</p>
          ) : (
            <select
              name="PositionID"
              value={conformance.js2html.PositionID(user.PositionID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {positions.map((pos) => (
                <option key={pos.PositionID} value={pos.PositionID}>
                  {pos.PositionName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Department" error={errors.DepartmentID}>
          {!departments ? (
            <p>{loadingDepartmentsMessage}</p>
          ) : (
            <select
              name="DepartmentID"
              value={conformance.js2html.DepartmentID(user.DepartmentID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {departments.map((dep) => (
                <option key={dep.DepartmentID} value={dep.DepartmentID}>
                  {dep.DepartmentName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Work Status" error={errors.WorkStatusID}>
          {!workStatuses ? (
            <p>{loadingWorkStatusesMessage}</p>
          ) : (
            <select
              name="WorkStatusID"
              value={conformance.js2html.WorkStatusID(user.WorkStatusID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {workStatuses.map((status) => (
                <option key={status.WorkStatusID} value={status.WorkStatusID}>
                  {status.WorkTypeName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Image URL" error={errors.UserImageURL}>
          <input
            type="text"
            name="UserImageURL"
            value={conformance.js2html.UserImageURL(user.UserImageURL)}
            onChange={handleChange}
          />
        </Form.Item>

        {isCreating && (
          <Form.Item label="Password" error={passwordError}>
            <input
              type="password"
              placeholder="Set a login password (min. 8 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
              }}
            />
          </Form.Item>
        )}
      </Form>
    </>
  );
}

export default UserForm;
