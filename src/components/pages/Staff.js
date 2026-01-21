import { useState, useEffect } from "react";
import StaffForm from "../entities/staff/StaffForm.js";
import API from "../api/API.js";
import UserCard from "../entities/staff/StaffCard.js";

function Staff() {
  const endpoint = "/users";
  const [users, setUsers] = useState(null); // Initialized as null to track loading state
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  const [showNewStaffForm, setShowNewStaffForm] = useState(false);

  const getStaff = async () => {
    const response = await API.get("/users");
    if (response.isSuccess) {
      setUsers(response.result);
    } else {
      setLoadingMessage(response.message);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleAdd = () => setShowNewStaffForm(true);
  const handleDismissAdd = () => setShowNewStaffForm(false);

  const handleSubmit = async (staff) => {
    const response = await API.post(endpoint, staff);
    if (response.isSuccess) {
      getStaff();
      return true;
    }
    return false;
  };

  return (
    <section>
      {/* 1. RESTORED FORM RENDERING */}
      {showNewStaffForm && (
        <StaffForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}

      <div className="staff-container">
        <div className="staff-header">
          <h2>Staff Members</h2>
          <p>View and manage staff assignments</p>
          <button className="btn-add" onClick={handleAdd}>
            + Add Staff
          </button>
        </div>

        <div className="staff-table">
          <div className="table-row table-head">
            <span>STAFF MEMBER</span>
            <span>ROLE</span>
            <span>MODULES</span>
            <span>DUTIES</span>
            <span>TOTAL HOURS</span>
            <span></span>
          </div>

          {/* 2. ADDED GUARD AND LOADING LOGIC */}
          {!users ? (
            <div className="p-10 text-center">{loadingMessage}</div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center">No users found.</div>
          ) : (
            users.map((user) => <UserCard user={user} key={user.UserID} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default Staff;
