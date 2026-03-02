export default function FormItem({ children, label, advice, error }) {
  // Initialisation --------------------------

  // State -----------------------------------

  // Handlers --------------------------------

  // View ------------------------------------

  return (
    <div className="FormItem">
      <label className="FormLabel">{label}</label>
      {advice && <p className="FormAdvice">{advice}</p>}

      <div className="FormInputContainer">{children}</div>

      {error && <p className="FormError">{error}</p>}
    </div>
  );
}
