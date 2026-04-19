export default function HomeProfile({ user }) {
  const initials = `${user.UserFirstname?.[0] ?? ""}${user.UserLastname?.[0] ?? ""}`;

  return (
    <div className="homeCard">
      <h3>My Profile</h3>
      <div className="homeProfile">
        {user.UserImageURL ? (
          <img className="homeAvatar" src={user.UserImageURL} alt={user.UserFirstname} />
        ) : (
          <div className="homeAvatarFallback">{initials}</div>
        )}
        <p className="homeProfileName">
          {user.UserTitle} {user.UserFirstname} {user.UserLastname}
        </p>
        <p className="homeProfileTitle">{user.PositionName}</p>
      </div>
      <div className="homeProfileDetails">
        <div className="homeProfileRow">
          <span>Email</span>
          <span>{user.UserEmail}</span>
        </div>
        <div className="homeProfileRow">
          <span>Department</span>
          <span>{user.DepartmentName}</span>
        </div>
        <div className="homeProfileRow">
          <span>Work Type</span>
          <span>{user.WorkTypeName}</span>
        </div>
        <div className="homeProfileRow">
          <span>Role</span>
          <span>{user.UserTypeName}</span>
        </div>
      </div>
    </div>
  );
}
