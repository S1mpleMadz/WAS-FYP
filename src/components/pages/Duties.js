import DutiesCruddler from "../entities/duty/DutyCruddler.js";

export default function Duties() {
  const endpoint = "/duties";
  return (
    <>
      <h1>Duties</h1>
      <DutiesCruddler endpoint={endpoint} />
    </>
  );
}
