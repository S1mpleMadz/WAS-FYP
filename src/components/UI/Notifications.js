import { Modal } from "./Modal.js";
import Action from "./Actions.js";
import "./Notifications.css";

export function Alert({ show, message, onConfirm, onDismiss }) {
  return (
    <div className="notificationAlert">
      <Modal show={show} title="Added">
        <p>{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}

export function Confirm({ show, message, onConfirm, onDismiss }) {
  const handleDismiss = () => {
    onConfirm();
    onDismiss();
  };
  return (
    <div className="notificationConfirm">
      <Modal
        show={show}
        title="Confirm requested"
        modalPaneClass="notificationConfirm"
      >
        <p>{message}</p>
        <Action.Tray>
          <Action.Yes showText onClick={handleDismiss} />
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}

export function Error({ show, message, onDismiss }) {
  return (
    <div className="notificationError">
      <Modal
        show={show}
        title="Error detected"
        modalPaneClass="notificationError"
      >
        <p>{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Modal>
    </div>
  );
}
