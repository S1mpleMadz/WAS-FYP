import { useAuth } from "../../auth/AuthContext.js";
import useLoad from "../../api/useLoad.js";
import Table from "../../UI/Table.js";
import { teachingColumns } from "../MoreUserInfo/userInfoColumns.js";

export default function StaffModuleView() {
  const { loggedInUser } = useAuth();
  const userId = loggedInUser?.userID;
  const [teaching, isLoading, loadingMsg] = useLoad(userId ? `/teaching/user/${userId}` : null);

  if (isLoading) return <p>{loadingMsg}</p>;

  return (
    <Table
      columns={teachingColumns}
      data={teaching || []}
      emptyMessage="You have no module teaching assignments."
    />
  );
}
