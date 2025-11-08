import { useState, useEffect } from "react";

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
    const URL = "http://localhost:5000/api";
    const endpointAddress = URL + endpoint;
    const response = await fetch(endpointAddress);
    const result = await response.json();

    setUsers(result);
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
