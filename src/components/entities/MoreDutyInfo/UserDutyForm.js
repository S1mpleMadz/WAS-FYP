import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";

const defaultAssignment = {
  UserID: null,
  DutyID: null,
};

const conformance = {
  html2js: {
    UserID: (v) => (v === "0" ? null : parseInt(v, 10)),
    DutyID: (v) => (v === "" ? null : parseInt(v, 10)),
  },
  js2html: {
    UserID: (v) => (v === null ? "0" : String(v)),
    DutyID: (v) => (v === null ? "" : String(v)),
  },
};

const validation = {
  isValid: {
    UserID: (v) => v !== null && v > 0,
    DutyID: () => true,
  },
  errorMessage: {
    UserID: "Please select a staff member",
    DutyID: "",
  },
};

export default function UserDutyForm({ dutyId, onSubmit, onCancel }) {
  const assignmentWithDuty = {
    ...defaultAssignment,
    DutyID: dutyId,
  };

  const [users, isLoadingUsers, loadingUsersMessage] = useLoad("/users");
  const [assignment, errors, handleChange, handleSubmit] = Form.useForm(
    assignmentWithDuty,
    conformance,
    validation,
    onSubmit,
  );

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitButtonText="Assign Staff">
      <Form.Item label="Staff Member" error={errors.UserID}>
        {isLoadingUsers ? (
          <p>{loadingUsersMessage || "Loading staff..."}</p>
        ) : (
          <select
            name="UserID"
            value={conformance.js2html.UserID(assignment.UserID)}
            onChange={handleChange}
          >
            <option value="0">Select a staff member</option>
            {users &&
              users.map((user) => (
                <option key={user.UserID} value={user.UserID}>
                  {user.UserFirstname} {user.UserLastname}
                </option>
              ))}
          </select>
        )}
      </Form.Item>
    </Form>
  );
}
