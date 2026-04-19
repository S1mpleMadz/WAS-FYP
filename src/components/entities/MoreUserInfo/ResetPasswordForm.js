import { useState } from "react";
import Form from "../../UI/Form.js";

export default function ResetPasswordForm({ onCancel, onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (password.trim().length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirm)
      newErrors.confirm = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onSubmit(password);
  };

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitButtonText="Reset Password">
      <Form.Item label="New Password" error={errors.password}>
        <input
          type="password"
          placeholder="Enter new password (min. 8 characters)"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
        />
      </Form.Item>
      <Form.Item label="Confirm Password" error={errors.confirm}>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => { setConfirm(e.target.value); setErrors({}); }}
        />
      </Form.Item>
    </Form>
  );
}
