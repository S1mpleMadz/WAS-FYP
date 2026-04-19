export const defaultModule = {
  ModuleCode: "",
  ModuleName: "",
  DepartmentID: 0,
  LeaderID: 0,
  ModuleLevel: 0,
  ModuleCredits: 0,
};

export const levels = [4, 5, 6, 7];
export const credits = [15, 30];

export const conformance = {
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

export const validation = {
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
