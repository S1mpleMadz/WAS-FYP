import { useState, useEffect } from "react";
import API from "../api/API.js";

function Staff() {
  // Initialisation
  const loggedinUser = null;
  const endpoint = "/users";

  // State
  const [users, setUsers] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

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

  // View
  return (
    <section>
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
