import { useState, useEffect } from "react";
import FormItem from "../../UI/Form.js";
import API from "../../api/API.js";
import "./StaffForm.css";

const emptyStaff = {
  UserTitle: "",
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "xxx@kingston.ac.uk",
  UserImageURL: "https://somthing",
  UserTypeID: 0,
  PositionID: 0,
  DepartmentID: 0,
  WorkStatusID: 0,
};

const validation = {
  isValid: {
    UserTitle: (val) => ["Mr", "Mrs", "Miss"].includes(val),
    UserFirstname: (val) => val.length > 0,
    UserLastname: (val) => val.length > 0,
    UserEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    UserImageURL: (val) => val.length > 0,
    UserTypeID: (id) => id !== 0,
    PositionID: (id) => id !== 0,
    DepartmentID: (id) => id !== 0,
    WorkStatusID: (id) => id !== 0,
  },
  messages: {
    UserTitle: "No Staff Title Has been Selected",
    UserFirstname: "Staff First Name is Empty",
    UserLastname: "Staff Last Name is Empty",
    UserEmail: "Staff Email is Not Valid",
    UserImageURL: "Staff Image URL is Empty",
    UserTypeID: "No Staff Type Has been Selected",
    PositionID: "No Staff Position Has been Selected",
    DepartmentID: "No Staff Department Has been Selected",
    WorkStatusID: "No Staff Work Status Has been Selected",
  },
};

export default function StaffForm({
  onDismiss,
  onSubmit,
  initialStaff = emptyStaff,
}) {
  const [staff, setStaff] = useState(initialStaff);
  const [errors, setErrors] = useState({});

  const [lookups, setLookups] = useState({
    types: null,
    workstatus: null,
    positions: null,
    departments: null,
  });

  useEffect(() => {
    const loadAllData = async () => {
      const [typeRes, workRes, posRes, depRes] = await Promise.all([
        API.get("/usertypes"),
        API.get("/workstatus"),
        API.get("/positions"),
        API.get("/departments"),
      ]);

      setLookups({
        types: typeRes.isSuccess ? typeRes.result : [],
        workstatus: workRes.isSuccess ? workRes.result : [],
        positions: posRes.isSuccess ? posRes.result : [],
        departments: depRes.isSuccess ? depRes.result : [],
      });
    };
    loadAllData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name.includes("ID") ? parseInt(value) : value;

    setStaff({ ...staff, [name]: newValue });
    setErrors({
      ...errors,
      [name]: validation.isValid[name](newValue)
        ? null
        : validation.messages[name],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isStaffValid = true;
    const newErrors = {};

    Object.keys(validation.isValid).forEach((key) => {
      if (!validation.isValid[key](staff[key])) {
        newErrors[key] = validation.messages[key];
        isStaffValid = false;
      }
    });

    setErrors(newErrors);
    if (isStaffValid) {
      onSubmit(staff);
      onDismiss();
    }
  };

  const selectConfigs = [
    {
      label: "User Type",
      name: "UserTypeID",
      data: lookups.types,
      key: "UserTypeID",
      text: "TypeName",
    },
    {
      label: "Work Status",
      name: "WorkStatusID",
      data: lookups.workstatus,
      key: "WorkStatusID",
      text: "WorkTypeName",
    },
    {
      label: "Position",
      name: "PositionID",
      data: lookups.positions,
      key: "PositionID",
      text: "PositionName",
    },
    {
      label: "Department",
      name: "DepartmentID",
      data: lookups.departments,
      key: "DepartmentID",
      text: "DepartmentName",
    },
  ];

  return (
    <form className="BorderedForm" onSubmit={handleSubmit}>
      <FormItem label="User Title" error={errors.UserTitle}>
        <select
          name="UserTitle"
          value={staff.UserTitle}
          onChange={handleChange}
        >
          <option value="">None Selected</option>
          {["Mr", "Mrs", "Miss"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FormItem>

      {[
        { label: "First Name", name: "UserFirstname" },
        { label: "Last Name", name: "UserLastname" },
        { label: "Email", name: "UserEmail" },
        { label: "Image URL", name: "UserImageURL" },
      ].map((field) => (
        <FormItem
          key={field.name}
          label={field.label}
          error={errors[field.name]}
        >
          <input
            type="text"
            name={field.name}
            value={staff[field.name]}
            onChange={handleChange}
          />
        </FormItem>
      ))}

      {selectConfigs.map((config) => (
        <FormItem
          key={config.name}
          label={config.label}
          error={errors[config.name]}
        >
          {!config.data ? (
            <p>Loading...</p>
          ) : (
            <select
              name={config.name}
              value={staff[config.name]}
              onChange={handleChange}
            >
              <option value="0">None Selected</option>
              {config.data.map((item) => (
                <option key={item[config.key]} value={item[config.key]}>
                  {item[config.text]}
                </option>
              ))}
            </select>
          )}
        </FormItem>
      ))}

      <div className="button-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={onDismiss}>
          Cancel
        </button>
      </div>
    </form>
  );
}
