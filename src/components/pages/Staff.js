import { useState, useEffect } from "react";
import StaffForm from "../entities/staff/StaffForm.js";
import API from "../api/API.js";

function Staff() {
  // Initialisation
  // const loggedinUser = null;
  const endpoint = "/users";

  // State
  const [users, setUsers] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const [showNewStaffForm, setShowNewStaffForm] = useState(false);

  // Context

  // Methods

  const getStaff = async () => {
    const response = await API.get("/users");

    response.isSuccess
      ? setUsers(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleAdd = () => setShowNewStaffForm(true);

  const handleDismissAdd = () => setShowNewStaffForm(false);

  const handleSubmit = async (staff) => {
    const response = await API.post(endpoint, staff);

    return response.isSuccess ? getStaff() || true : false;
  };

  // View
  return (
    <section>
      <button onClick={handleAdd}>Add Staff</button>
      {showNewStaffForm && (
        <StaffForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}
      <h1>Welome to Staff</h1>
      {!users ? (
        <p>{loadingMessage}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <p key={user.UserID}>
            {user.UserFirstname} {user.UserLastname}
          </p>
        ))
      )}
    </section>
  );
}

export default Staff;
