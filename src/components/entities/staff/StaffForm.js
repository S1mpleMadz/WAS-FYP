import { useState } from "react";
import FormItem from "../../UI/Form.js";
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
    UserEmail: (Email) => Email.length > 0,
    UserImageURL: (ImageURL) => ImageURL.length > 0,
    UserTypeID: (id) => true,
    PositionID: (id) => true,
    DepartmentID: (id) => true,
    WorkStatusID: (id) => true,
  };

  const errorMessage = {
    UserTitle: "No Staff Title Has been Selected",
    UserFirstname: "Staff First Name is Empty",
    UserLastname: "Staff Last Name is Empty",
    UserEmail: "Staff Email is Empty",
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
          <option value="Select" disabled>
            {"Select Option"}
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
    </form>
  );
}
