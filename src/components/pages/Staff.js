import UserCruddler from "../entities/user/UserCruddler.js";

export default function Staff() {
  const endpoint = "/users";
  return (
    <>
      <h1>Staff</h1>
      <UserCruddler endpoint={endpoint} />
    </>
  );
}
