import { useState, useEffect } from "react";
import FormItem from "../../UI/Form.js";
import API from "../../api/API.js";
import "./StaffForm.css";

const emptyStaff = {
  UserTitle: "Mr",
  UserFirstname: "test",
  UserLastname: "pop",
  UserEmail: "t.pop@kingston.ac.uk",
  UserImageURL: "https://somthing",
  UserTypeID: 0,
  PositionID: 0,
  DepartmentID: 0,
  WorkStatusID: 0,
};

export default function StaffForm({ initialStaff = emptyStaff }) {
  // Initialisation --------------------------

  const isValid = {
    UserTitle: (Title) => Title === "Mr" || Title === "Mrs" || Title === "Miss",
    UserFirstname: (Firstname) => Firstname.length > 0,
    UserLastname: (Lastname) => Lastname.length > 0,
    UserEmail: (Email) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        Email
      ),
    UserImageURL: (ImageURL) => ImageURL.length > 0,
    UserTypeID: (id) => id !== 0,
    PositionID: (id) => id !== 0,
    DepartmentID: (id) => id !== 0,
    WorkStatusID: (id) => id !== 0,
  };

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

  // State -----------------------------------

  const [staff, setStaff] = useState(initialStaff);

  const [errors, setErrors] = useState(
    Object.keys(initialStaff).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  // Types
  const [types, setTypes] = useState(null);
  const [loadingTypesMessage, setLoadingTypesMessage] = useState(
    "Loading Recoards . . . "
  );

  const getTypes = async () => {
    const response = await API.get("/types");

    response.isSuccess
      ? setTypes(response.result)
      : setLoadingTypesMessage(response.message);
  };

  useEffect(() => {
    getTypes();
  }, []);

  // Work Sttaus of User

  const [workstatus, setWorkStatus] = useState(null);
  const [loadingWorkStatusMessage, setLoadingWorkStatusMessage] = useState(
    "Loading Recoards . . . "
  );

  const getWorkStatus = async () => {
    const response = await API.get("/workstatus");

    response.isSuccess
      ? setWorkStatus(response.result)
      : setLoadingWorkStatusMessage(response.message);
  };

  useEffect(() => {
    getWorkStatus();
  }, []);

  // Positions

  const [positions, setPositionStatus] = useState(null);
  const [loadingPositionMessage, setLoadingPositionMessage] = useState(
    "Loading Recoards . . . "
  );

  const getPositionStatus = async () => {
    const response = await API.get("/positions");

    response.isSuccess
      ? setPositionStatus(response.result)
      : setLoadingPositionMessage(response.message);
  };

  useEffect(() => {
    getPositionStatus();
  }, []);

  // Department

  const [departments, setDepartmentStatus] = useState(null);
  const [loadingDepartmentMessage, setLoadingDepartmentMessage] = useState(
    "Loading Recoards . . . "
  );

  const getDepartmentStatus = async () => {
    const response = await API.get("/departments");

    response.isSuccess
      ? setDepartmentStatus(response.result)
      : setLoadingDepartmentMessage(response.message);
  };

  useEffect(() => {
    getDepartmentStatus();
  }, []);

  // Handlers --------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newValue =
      name === "UserTypeID" ||
      name === "PositionID" ||
      name === "DepartmentID" ||
      name === "WorkStatusID"
        ? parseInt(value)
        : value;

    setStaff({ ...staff, [name]: newValue });

    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
  };

  // View ------------------------------------
  return (
    <form className="BorderedForm">
      <FormItem
        label="User Title"
        htmlFor="UserTitle"
        advice="Please Enter Staff Title"
        error={errors.UserTitle}
      >
        <select
          name="UserTitle"
          value={staff.UserTitle}
          onChange={handleChange}
        >
          <option value="0" disabled>
            None Selected
          </option>
          {["Mr", "Mrs", "Miss"].map((title) => (
            <option key={title}>{title}</option>
          ))}
        </select>
      </FormItem>

      <FormItem
        label="Staff First Name"
        htmlFor="UserFirstname"
        advice="Please Enter Staff First Name"
        error={errors.UserFirstname}
      >
        <input
          type="text"
          name="UserFirstname"
          value={staff.UserFirstname}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Staff Last Name"
        htmlFor="UserLastname"
        advice="Please Enter Staff Last Name"
        error={errors.UserLastname}
      >
        <input
          type="text"
          name="UserLastname"
          value={staff.UserLastname}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Staff Email Address"
        htmlFor="UserEmail"
        advice="Please Enter Staff Email Address"
        error={errors.UserEmail}
      >
        <input
          type="text"
          name="UserEmail"
          value={staff.UserEmail}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Staff Picture URL"
        htmlFor="UserImageURL"
        advice="Please Enter Staff Image URL"
        error={errors.UserImageURL}
      >
        <input
          type="text"
          name="UserImageURL"
          value={staff.UserImageURL}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="User Type / Position / Role"
        htmlFor="UserTypeID"
        advice="Select Staff Type/Position/Role"
        error={errors.UserTypeID}
      >
        {!types ? (
          <p>{loadingTypesMessage}</p>
        ) : types.length === 0 ? (
          <p> No User Types</p>
        ) : (
          <select
            name="UserTypeID"
            value={staff.UserTypeID}
            onChange={handleChange}
          >
            <option value="0" disable>
              None Selected
            </option>
            {types.map((type) => (
              <option key={type.UserTypeID} value={type.UserTypeID}>
                {type.TypeName}
              </option>
            ))}
          </select>
        )}
      </FormItem>

      <FormItem
        label="Work Status"
        htmlFor="WorkStatusID"
        advice="Select Staff Work Status"
        error={errors.WorkStatusID}
      >
        {!workstatus ? (
          <p>{loadingWorkStatusMessage}</p>
        ) : workstatus.length === 0 ? (
          <p> No User Work Status</p>
        ) : (
          <select
            name="WorkStatusID"
            value={staff.WorkStatusID}
            onChange={handleChange}
          >
            <option value="0" disable>
              None Selected
            </option>
            {workstatus.map((workstate) => (
              <option
                key={workstate.WorkStatusID}
                value={workstate.WorkStatusID}
              >
                {workstate.WorkTypeName}
              </option>
            ))}
          </select>
        )}
      </FormItem>

      <FormItem
        label="Staff Position"
        htmlFor="PositionID"
        advice="Select Staff Position"
        error={errors.PositionID}
      >
        {!positions ? (
          <p>{loadingPositionMessage}</p>
        ) : positions.length === 0 ? (
          <p> No User positions</p>
        ) : (
          <select
            name="PositionID"
            value={staff.PositionID}
            onChange={handleChange}
          >
            <option value="0" disable>
              None Selected
            </option>
            {positions.map((position) => (
              <option key={position.PositionID} value={position.PositionID}>
                {position.PositionName}
              </option>
            ))}
          </select>
        )}
      </FormItem>

      <FormItem
        label="Staff Department"
        htmlFor="DepartmentID"
        advice="Select Staff Department"
        error={errors.DepartmentID}
      >
        {!departments ? (
          <p>{loadingDepartmentMessage}</p>
        ) : departments.length === 0 ? (
          <p> No User positions</p>
        ) : (
          <select
            name="DepartmentID"
            value={staff.DepartmentID}
            onChange={handleChange}
          >
            <option value="0" disable>
              None Selected
            </option>
            {departments.map((department) => (
              <option
                key={department.DepartmentID}
                value={department.DepartmentID}
              >
                {department.DepartmentName}
              </option>
            ))}
          </select>
        )}
      </FormItem>
    </form>
  );
}
