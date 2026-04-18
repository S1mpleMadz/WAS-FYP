import ModuleCrudler from "../entities/module/ModuleCrudler.js";

function Modules() {
  const myModulesEndpoint = `/modules/`;
  return (
    <>
      <h1>Modules</h1>
      <ModuleCrudler endpoint={myModulesEndpoint} />
    </>
  );
}

export default Modules;
