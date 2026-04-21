import { useRole } from "../auth/useRole.js";
import DutyCruddler from "../entities/duty/DutyCruddler.js";
import StaffDutyView from "../entities/duty/StaffDutyView.js";

function Duties() {
  const { isStaff } = useRole();

  return (
    <section className="duties-page">
      <div className="duties-header">
        <h1>Duties</h1>
      </div>
      <hr className="divider" />
      {isStaff ? <StaffDutyView /> : <DutyCruddler endpoint="/duty" />}
    </section>
  );
}

export default Duties;
