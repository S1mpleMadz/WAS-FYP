import { useAuth } from "../../auth/AuthContext.js";
import useLoad from "../../api/useLoad.js";
import Table from "../../UI/Table.js";
import { dutyColumns } from "../MoreUserInfo/userInfoColumns.js";

export default function StaffDutyView() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.userID;
  const [duties, isLoading, loadingMsg] = useLoad(userId ? `/userduties/user/${userId}` : null);

  if (isLoading) return <p>{loadingMsg}</p>;

  return (
    <Table
      columns={dutyColumns}
      data={duties || []}
      emptyMessage="You have no duties assigned."
    />
  );
}
