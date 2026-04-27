import { Modal } from "./Modal.js";
import Actions from "./Actions.js";

export default function DeleteConfirmation({
  show,
  itemType,
  itemName,
  assignedTo,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} title="Confirm Deletion">
      <p>
        Are you sure you want to delete this {itemType}?
        {itemName && <strong> ({itemName})</strong>}
      </p>
      {assignedTo && assignedTo.length > 0 && (
        <>
          <p className="warning">This is currently assigned to:</p>
          <ul>
            {assignedTo.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      )}
      <p className="warning">This action cannot be undone.</p>
      <Actions.Tray>
        <Actions.Yes onClick={onConfirm} showText buttonText="Yes, Delete" />
        <Actions.No onClick={onCancel} showText buttonText="No, Cancel" />
      </Actions.Tray>
    </Modal>
  );
}
