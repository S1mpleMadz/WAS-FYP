import DutyCruddler from "../entities/duty/DutyCruddler.js";

function Duties() {
  return (
    <section className="duties-page">
      <div className="duties-header">
        <h1>Duties</h1>
      </div>
      <hr className="divider" />
      <DutyCruddler endpoint="/duty" />
    </section>
  );
}

export default Duties;
