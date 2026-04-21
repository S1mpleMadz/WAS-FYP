import { useRole } from "../auth/useRole.js";
import ModuleCruddler from "../entities/module/ModuleCruddler.js";
import StaffModuleView from "../entities/module/StaffModuleView.js";

function Modules() {
  const { isStaff } = useRole();

  return (
    <section className="modules-page">
      <div className="modules-header">
        <h1>Modules</h1>
      </div>
      <hr className="divider" />
      {isStaff ? <StaffModuleView /> : <ModuleCruddler endpoint="/modules" />}
    </section>
  );
}

export default Modules;
