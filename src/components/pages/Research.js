import { useRole } from "../auth/useRole.js";
import ResearchCruddler from "../entities/research/ResearchCruddler.js";
import StaffResearchView from "../entities/research/StaffResearchView.js";

function Research() {
  const { isStaff } = useRole();

  return (
    <section className="research-page">
      <div className="research-header">
        <h1>Research</h1>
      </div>
      <hr className="divider" />
      {isStaff ? <StaffResearchView /> : <ResearchCruddler endpoint="/research" />}
    </section>
  );
}

export default Research;
