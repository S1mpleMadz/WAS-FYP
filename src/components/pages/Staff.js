import UserCruddler from "../entities/user/UserCruddler.js";

function Staff() {
  return (
    <section className="staff-page">
      <div className="staff-header">
        <h1>Staff Directory</h1>
      </div>

      <hr className="divider" />

      <UserCruddler endpoint="/users" />
    </section>
  );
}

export default Staff;
