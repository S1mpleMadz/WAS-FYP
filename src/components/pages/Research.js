import ResearchCruddler from "../entities/research/ResearchCruddler.js";

function Research() {
  return (
    <section className="research-page">
      <div className="research-header">
        <h1>Research</h1>
      </div>
      <hr className="divider" />
      <ResearchCruddler endpoint="/research" />
    </section>
  );
}

export default Research;
