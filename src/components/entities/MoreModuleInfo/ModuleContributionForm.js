import Form from "../../UI/Form.js";
import useLoad from "../../api/useLoad.js";

// Field names match what the POST/PUT API expects: UserID, ModuleID (not Teaching-prefixed)
const defaultContribution = {
  UserID: null,
  ModuleID: null,
  TeachingLeading: 0,
  TeachingLecturing: 0,
  TeachingWorkshops: 0,
  TeachingAssessing: 0,
  TeachingModeration: 0,
};

const conformance = {
  html2js: {
    TeachingID:         (v) => (v === "" ? null : parseInt(v, 10)),
    UserID:             (v) => (v === "0" ? null : parseInt(v, 10)),
    ModuleID:           (v) => (v === "" ? null : parseInt(v, 10)),
    TeachingLeading:    (v) => parseInt(v, 10) || 0,
    TeachingLecturing:  (v) => parseInt(v, 10) || 0,
    TeachingWorkshops:  (v) => parseInt(v, 10) || 0,
    TeachingAssessing:  (v) => parseInt(v, 10) || 0,
    TeachingModeration: (v) => (v === "1" || v === 1 || v === true ? 1 : 0),
  },
  js2html: {
    TeachingID:         (v) => (v == null ? "" : String(v)),
    UserID:             (v) => (v === null ? "0" : String(v)),
    ModuleID:           (v) => (v === null ? "" : String(v)),
    TeachingLeading:    (v) => String(v),
    TeachingLecturing:  (v) => String(v),
    TeachingWorkshops:  (v) => String(v),
    TeachingAssessing:  (v) => String(v),
    TeachingModeration: (v) => String(v === true || v === 1 ? 1 : 0),
  },
};

const validation = {
  isValid: {
    TeachingID:         () => true,
    UserID:             (v) => v !== null && v > 0,
    ModuleID:           () => true,
    TeachingLeading:    (v) => v >= 0 && v <= 100,
    TeachingLecturing:  (v) => v >= 0 && v <= 100,
    TeachingWorkshops:  (v) => v >= 0 && v <= 100,
    TeachingAssessing:  (v) => v >= 0 && v <= 100,
    TeachingModeration: (v) => v === 0 || v === 1,
  },
  errorMessage: {
    TeachingID:         "",
    UserID:             "Please select a staff member",
    ModuleID:           "",
    TeachingLeading:    "Leading % must be between 0 and 100",
    TeachingLecturing:  "Lecturing % must be between 0 and 100",
    TeachingWorkshops:  "Workshops % must be between 0 and 100",
    TeachingAssessing:  "Assessing % must be between 0 and 100",
    TeachingModeration: "Please select moderation status",
  },
};

export default function ModuleContributionForm({ initialContribution, moduleId, onSubmit, onCancel }) {
  const contributionWithModule = {
    ...defaultContribution,
    ...initialContribution,
    ModuleID: moduleId,
  };

  const [users, isLoadingUsers, loadingUsersMessage] = useLoad("/users");
  const [contribution, errors, handleChange, handleSubmit] = Form.useForm(
    contributionWithModule,
    conformance,
    validation,
    onSubmit,
  );

  const submitText = initialContribution == null ? "Add Contribution" : "Save Changes";

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitButtonText={submitText}>
      <Form.Item label="Staff Member" error={errors.UserID}>
        {isLoadingUsers ? (
          <p>{loadingUsersMessage || "Loading staff..."}</p>
        ) : (
          <select
            name="UserID"
            value={conformance.js2html.UserID(contribution.UserID)}
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

      <Form.Item label="Leading %" error={errors.TeachingLeading}>
        <input
          type="number"
          name="TeachingLeading"
          value={conformance.js2html.TeachingLeading(contribution.TeachingLeading)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Lecturing %" error={errors.TeachingLecturing}>
        <input
          type="number"
          name="TeachingLecturing"
          value={conformance.js2html.TeachingLecturing(contribution.TeachingLecturing)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Workshops %" error={errors.TeachingWorkshops}>
        <input
          type="number"
          name="TeachingWorkshops"
          value={conformance.js2html.TeachingWorkshops(contribution.TeachingWorkshops)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Assessing %" error={errors.TeachingAssessing}>
        <input
          type="number"
          name="TeachingAssessing"
          value={conformance.js2html.TeachingAssessing(contribution.TeachingAssessing)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Moderation" error={errors.TeachingModeration}>
        <select
          name="TeachingModeration"
          value={conformance.js2html.TeachingModeration(contribution.TeachingModeration)}
          onChange={handleChange}
        >
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </Form.Item>
    </Form>
  );
}
