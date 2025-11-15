import { useState, useEffect } from "react";
import StaffForm from "../entities/staff/StaffForm.js";
import API from "../api/API.js";

function Staff() {
  // Initialisation
  const loggedinUser = null;
  const endpoint = "/users";

  // State
  const [users, setUsers] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  const [showNewStaffForm, setShowNewStaffForm] = useState(false);

  // Context

  // Methods

  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);

    response.isSuccess
      ? setUsers(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  const handleAdd = () => setShowNewStaffForm(true);

  const handleDismissAdd = () => setShowNewStaffForm(false);

  // View
  return (
    <section>
      <button onClick={handleAdd}>Add Staff</button>
      {showNewStaffForm && <StaffForm onDismiss={handleDismissAdd} />}
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
