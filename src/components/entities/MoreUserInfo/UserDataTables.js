import Table from "../../UI/Table.js";
import { teachingColumns, dutyColumns, researchColumns } from "./userInfoColumns.js";

export default function UserDataTables({
  teaching,
  isTeachingLoading,
  teachingLoadingMessage,
  teachingDuty,
  isDutyLoading,
  dutyLoadingMessage,
  research,
  isResearchLoading,
  researchLoadingMessage,
}) {
  return (
    <>
      <div className="teachingInfo">
        <h3 className="table-title">Modules this Staff member teaches:</h3>
        {isTeachingLoading ? (
          <p>Loading teaching data: {teachingLoadingMessage}</p>
        ) : (
          <Table
            columns={teachingColumns}
            data={teaching}
            emptyMessage="No teaching staff assigned to this module."
          />
        )}
      </div>

      <div className="teachingInfo">
        <h3 className="table-title">Duties that have been assigned to this Staff member</h3>
        {isDutyLoading ? (
          <p>Loading duties: {dutyLoadingMessage}</p>
        ) : (
          <Table
            columns={dutyColumns}
            data={teachingDuty}
            emptyMessage="No duties have been assigned to this user."
          />
        )}
      </div>

      <div className="teachingInfo">
        <h3 className="table-title">Research assigned to this Staff member</h3>
        {isResearchLoading ? (
          <p>Loading research: {researchLoadingMessage}</p>
        ) : (
          <Table
            columns={researchColumns}
            data={research}
            emptyMessage="No research has been assigned to this user."
          />
        )}
      </div>
    </>
  );
}
