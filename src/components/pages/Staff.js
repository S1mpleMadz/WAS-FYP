import { useState } from "react";

function Staff() {
  // Initialisation
  const loggedinUser = null;
  const endpoint = "/users";

  // State
  const [users, setUsers] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  // Context

  // Methods
  const URL = "http://http://localhost/api.php";
  const endpointaddress = URL + endpoint;
  fetch(endpointaddress);

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
          <p>
            {user.UserFirstname} {user.UserLastname}
          </p>
        ))
      )}
    </section>
  );
}

export default Staff;
