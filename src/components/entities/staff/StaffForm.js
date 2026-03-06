import Form from "../../UI/Form.js";
import useStaffFormOptions from "./useStaffFormOptions";
import "./StaffForm.css";

const emptyStaff = {
  UserTitle: "",
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "xxx@kingston.ac.uk",
  UserImageURL: "https://something",
  UserTypeID: 0,
  PositionID: 0,
  DepartmentID: 0,
  WorkStatusID: 0,
};

// Conformance: How HTML string values should be converted to JS data types
const conformance = {
  html2js: {
    UserTitle: (v) => v,
    UserFirstname: (v) => v,
    UserLastname: (v) => v,
    UserEmail: (v) => v,
    UserImageURL: (v) => v,
    UserTypeID: (v) => parseInt(v, 10),
    PositionID: (v) => parseInt(v, 10),
    DepartmentID: (v) => parseInt(v, 10),
    WorkStatusID: (v) => parseInt(v, 10),
  },
};

// Validation rules
const isValid = {
  UserTitle: (val) => val === "Mr" || val === "Mrs" || val === "Miss",
  UserFirstname: (val) => val.length > 0,
  UserLastname: (val) => val.length > 0,
  UserEmail: (val) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val),
  UserImageURL: (val) => val.length > 0,
  UserTypeID: (id) => id !== 0 && !isNaN(id),
  PositionID: (id) => id !== 0 && !isNaN(id),
  DepartmentID: (id) => id !== 0 && !isNaN(id),
  WorkStatusID: (id) => id !== 0 && !isNaN(id),
};

// Error Messages
const errorMessage = {
  UserTitle: "No Staff Title Has been Selected",
  UserFirstname: "Staff First Name is Empty",
  UserLastname: "Staff Last Name is Empty",
  UserEmail: "Staff Email is Not Valid",
  UserImageURL: "Staff Image URL is Empty",
  UserTypeID: "No Staff Type Has been Selected",
  PositionID: "No Staff Position Has been Selected",
  DepartmentID: "No Staff Department Has been Selected",
  WorkStatusID: "No Staff Work Status Has been Selected",
};

export default function StaffForm({
  onDismiss,
  onSubmit,
  initialStaff = emptyStaff,
}) {
  // Initialization --------------------------
  const { options, loadingMessages } = useStaffFormOptions();

  // Handle successful submit wrapper
  const handleFormSubmit = (record) => {
    onSubmit(record);
    onDismiss();
  };

  // State via Form Hook ---------------------
  const [record, errors, handleChange, handleSubmit] = Form.useForm(
    initialStaff,
    conformance,
    { isValid, errorMessage },
    handleFormSubmit,
  );

  // View ------------------------------------
  return (
    <Form
      onSubmit={handleSubmit}
      onCancel={onDismiss}
      submitButtonText="Save Staff"
    >
      <Form.Item
        label="User Title"
        advice="Please Enter Staff Title"
        error={errors.UserTitle}
      >
        <select
          name="UserTitle"
          value={record.UserTitle}
          onChange={handleChange}
        >
          <option value="" disabled>
            None Selected
          </option>
          {["Mr", "Mrs", "Miss"].map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item
        label="First Name"
        advice="Please Enter Staff First Name"
        error={errors.UserFirstname}
      >
        <input
          type="text"
          name="UserFirstname"
          value={record.UserFirstname}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Last Name"
        advice="Please Enter Staff Last Name"
        error={errors.UserLastname}
      >
        <input
          type="text"
          name="UserLastname"
          value={record.UserLastname}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Email Address"
        advice="Please Enter Staff Email Address"
        error={errors.UserEmail}
      >
        <input
          type="text"
          name="UserEmail"
          value={record.UserEmail}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Picture URL"
        advice="Please Enter Staff Image URL"
        error={errors.UserImageURL}
      >
        <input
          type="text"
          name="UserImageURL"
          value={record.UserImageURL}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="User Type / Role"
        advice="Select Staff Type"
        error={errors.UserTypeID}
      >
        {!options.types ? (
          <p>{loadingMessages.types}</p>
        ) : (
          <select
            name="UserTypeID"
            value={record.UserTypeID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None Selected
            </option>
            {options.types.map((type) => (
              <option key={type.UserTypeID} value={type.UserTypeID}>
                {type.TypeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Work Status"
        advice="Select Staff Work Status"
        error={errors.WorkStatusID}
      >
        {!options.workStatus ? (
          <p>{loadingMessages.workStatus}</p>
        ) : (
          <select
            name="WorkStatusID"
            value={record.WorkStatusID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None Selected
            </option>
            {options.workStatus.map((workstate) => (
              <option
                key={workstate.WorkStatusID}
                value={workstate.WorkStatusID}
              >
                {workstate.WorkTypeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Staff Position"
        advice="Select Staff Position"
        error={errors.PositionID}
      >
        {!options.positions ? (
          <p>{loadingMessages.positions}</p>
        ) : (
          <select
            name="PositionID"
            value={record.PositionID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None Selected
            </option>
            {options.positions.map((position) => (
              <option key={position.PositionID} value={position.PositionID}>
                {position.PositionName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item
        label="Department"
        advice="Select Staff Department"
        error={errors.DepartmentID}
      >
        {!options.departments ? (
          <p>{loadingMessages.departments}</p>
        ) : (
          <select
            name="DepartmentID"
            value={record.DepartmentID}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None Selected
            </option>
            {options.departments.map((department) => (
              <option
                key={department.DepartmentID}
                value={department.DepartmentID}
              >
                {department.DepartmentName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>
    </Form>
  );
}
