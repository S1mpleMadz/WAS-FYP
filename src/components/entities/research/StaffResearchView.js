import { useAuth } from "../../auth/AuthContext.js";
import useLoad from "../../api/useLoad.js";
import Table from "../../UI/Table.js";
import { researchColumns } from "../MoreUserInfo/userInfoColumns.js";

export default function StaffResearchView() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.userID;
  const [research, isLoading, loadingMsg] = useLoad(userId ? `/research/user/${userId}` : null);

  if (isLoading) return <p>{loadingMsg}</p>;

  return (
    <Table
      columns={researchColumns}
      data={research || []}
      emptyMessage="You have no research assigned."
    />
  );
}
