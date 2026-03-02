import { useEffect, useState } from "react";
import API from "../api/API.js";
import Action from "../UI/Actions.js"; // Importing your Action UI
import Modal, { useModal } from "../UI/Modal.js"; // Importing your Modal UI
import StaffForm from "../entities/staff/StaffForm";
import StaffCard from "../entities/staff/StaffCard.js";

function Staff() {
  // State ---------------------------------------
  const [users, setUsers] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");

  // Use your provided Modal Hook
  const [showModal, modalContent, openModal, closeModal] = useModal(false);

  // Methods -------------------------------------
  const getStaff = async () => {
    const response = await API.get("/users");
    if (response.isSuccess) {
      setUsers(response.result);
    } else {
      setLoadingMessage(response.message);
      setUsers([]);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  const handleSubmit = async (staff) => {
    const response = await API.post("/users", staff);
    if (response.isSuccess) {
      closeModal(); // Close modal on success
      getStaff(); // Refresh list
      return true;
    }
    return false;
  };

  const handleDismiss = () => {
    closeModal();
  };

  // Open the modal with the StaffForm component inside it
  const handleAdd = () => {
    openModal(<StaffForm onDismiss={handleDismiss} onSubmit={handleSubmit} />);
  };

  // View ----------------------------------------
  return (
    <section className="staff-page">
      <Modal show={showModal} title="Add New Staff Member">
        {modalContent}
      </Modal>

      <div className="staff-header">
        <h1>Staff Directory</h1>

        <Action.Tray>
          <Action.Add showText buttonText="Add Staff" onClick={handleAdd} />
          <Action.ListAll showText buttonText="List All" onClick={getStaff} />
        </Action.Tray>
      </div>

      <hr className="divider" />

      {!users ? (
        <p className="status-message">{loadingMessage}</p>
      ) : users.length === 0 ? (
        <p className="status-message">No staff members found.</p>
      ) : (
        /* FIX 3: JSX expressions inside a return must be wrapped in a container or Fragment */
        <div className="staff-list">
          {users.map((user) => (
            <StaffCard user={user} key={user.UserID} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Staff;
