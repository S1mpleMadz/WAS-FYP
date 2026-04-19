import ModuleCruddler from "../entities/module/ModuleCruddler.js";

function Modules() {
  return (
    <section className="modules-page">
      <div className="modules-header">
        <h1>Modules</h1>
      </div>
      <hr className="divider" />
      <ModuleCruddler endpoint="/modules" />
    </section>
  );
}

export default Modules;
