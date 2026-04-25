import { useState } from "react";
import Action from "./Actions";
import "./Form.css";

export function Form({ children, onSubmit, onCancel, submitButtonText }) {
  // View ---------------------------------------------------------
  return (
    <div className="Form">
      <div className="FormTray">{children}</div>
      <Action.Tray>
        <Action.Submit
          showText
          onClick={onSubmit}
          buttonText={submitButtonText || "Submit"}
        />
        {onCancel && (
          <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
        )}
      </Action.Tray>
    </div>
  );
}

function Item({ children, label, advice, error }) {
  // View ---------------------------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel">{label}</label>
      {advice && <p className="FormAdvice">{advice}</p>}
      <div className="FormInputContainer">{children}</div>
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

function useForm(
  initialRecord,
  { html2js },
  { isValid, errorMessage },
  onSubmit,
) {
  // State ----------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(isValid).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {},
    ),
  );

  const isValidRecord = (currentRecord) => {
    let isRecordValid = true;
    const newErrors = { ...errors };

    Object.keys(isValid).forEach((key) => {
      if (isValid[key](currentRecord[key])) {
        newErrors[key] = null;
      } else {
        newErrors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });

    setErrors(newErrors);
    return isRecordValid;
  };

  // Handlers -----------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Apply conformance (html2js) to format the value before saving to state
    const formattedValue = html2js[name] ? html2js[name](value) : value;

    setRecord({ ...record, [name]: formattedValue });

    // Optional: Clear error for this specific field as the user types
    setErrors({
      ...errors,
      [name]: isValid[name](formattedValue) ? null : errorMessage[name],
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (isValidRecord(record)) {
      onSubmit(record);
    }
  };

  // View ---------------------------------------------------------
  return [record, errors, handleChange, handleSubmit];
}

// Compose compound component
Form.Item = Item;
Form.useForm = useForm;

export default Form;
