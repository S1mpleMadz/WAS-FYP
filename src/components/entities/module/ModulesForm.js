import { useState, useEffect } from "react";
import FormItem from "../../UI/Form.js";
import API from "../../api/API.js";

const emptyModule = {
  ModuleName: "",
  ModuleCode: "",
  ModuleLevel: 0,
  ModuleLeaderID: 0,
  ModuleImageURL:
    "https://images.freeimages.com/image/previews/3c3/book-icon-design-10-1628731.png", // Default placeholder
  ModuleDepartmentID: 0,
};

const validation = {
  isValid: {
    ModuleName: (val) => val.length > 3,
    ModuleCode: (val) => /^[A-Z]{2}\d{4}$/.test(val), // Example: CI5500
    ModuleLevel: (val) => val >= 3 && val <= 7,
    ModuleLeaderID: (id) => id !== 0,
    ModuleDepartmentID: (id) => id !== 0,
    ModuleImageURL: (val) => true, // Optional
  },
  messages: {
    ModuleName: "Module Name is too short",
    ModuleCode: "Code format invalid (e.g. CI5500)",
    ModuleLevel: "Level must be between 3 and 7",
    ModuleLeaderID: "No Module Leader selected",
    ModuleDepartmentID: "No Department selected",
    ModuleImageURL: "",
  },
};

export default function ModuleForm({
  onDismiss,
  onSubmit,
  initialModule = emptyModule,
}) {
  const [module, setModule] = useState(initialModule);
  const [errors, setErrors] = useState({});

  // Lookups state
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);

  // Load Departments and Staff (for the Leader dropdown)
  useEffect(() => {
    const loadLookups = async () => {
      const [deptRes, staffRes] = await Promise.all([
        API.get("/modules/departments"),
        API.get("/users"),
      ]);

      setDepartments(deptRes.isSuccess ? deptRes.result : []);
      setStaff(staffRes.isSuccess ? staffRes.result : []);
    };
    loadLookups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Helper to convert numeric fields
    const newValue =
      name.endsWith("ID") || name === "ModuleLevel" ? parseInt(value) : value;

    setModule({ ...module, [name]: newValue });

    // Inline validation
    setErrors({
      ...errors,
      [name]: validation.isValid[name](newValue)
        ? null
        : validation.messages[name],
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    Object.keys(validation.isValid).forEach((key) => {
      if (!validation.isValid[key](module[key])) {
        newErrors[key] = validation.messages[key];
        isValid = false;
      }
    });

    setErrors(newErrors);
    if (isValid) onSubmit(module);
  };

  return (
    <form className="BorderedForm" onSubmit={handleFormSubmit}>
      <FormItem label="Module Name" error={errors.ModuleName}>
        <input
          name="ModuleName"
          value={module.ModuleName}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem label="Module Code" error={errors.ModuleCode}>
        <input
          name="ModuleCode"
          value={module.ModuleCode}
          onChange={handleChange}
          placeholder="e.g. CI4005"
        />
      </FormItem>

      <FormItem label="Module Level" error={errors.ModuleLevel}>
        <select
          name="ModuleLevel"
          value={module.ModuleLevel}
          onChange={handleChange}
        >
          <option value="0">Select Level</option>
          {[3, 4, 5, 6, 7].map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </FormItem>

      <FormItem label="Department" error={errors.ModuleDepartmentID}>
        <select
          name="ModuleDepartmentID"
          value={module.ModuleDepartmentID}
          onChange={handleChange}
        >
          <option value="0">Select Department</option>
          {departments.map((d) => (
            <option key={d.DepartmentID} value={d.DepartmentID}>
              {d.DepartmentName}
            </option>
          ))}
        </select>
      </FormItem>

      <FormItem label="Module Leader" error={errors.ModuleLeaderID}>
        <select
          name="ModuleLeaderID"
          value={module.ModuleLeaderID}
          onChange={handleChange}
        >
          <option value="0">Select Staff Member</option>
          {staff.map((s) => (
            <option key={s.UserID} value={s.UserID}>
              {s.UserFirstname} {s.UserLastname}
            </option>
          ))}
        </select>
      </FormItem>

      <FormItem label="Image URL" error={errors.ModuleImageURL}>
        <input
          name="ModuleImageURL"
          value={module.ModuleImageURL}
          onChange={handleChange}
        />
      </FormItem>

      <div className="button-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={onDismiss}>
          Cancel
        </button>
      </div>
    </form>
  );
}
