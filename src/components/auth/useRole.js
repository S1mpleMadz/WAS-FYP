import { useAuth } from "./AuthContext.js";

export function useRole() {
  const { loggedInUser } = useAuth();
  const userTypeID = loggedInUser?.userTypeID ?? null;
  return {
    userTypeID,
    isAdmin: userTypeID === 1 || userTypeID === 2,
    isStaff: userTypeID === 3,
    isGuest: userTypeID === 4,
  };
}
