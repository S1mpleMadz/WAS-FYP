import { useState, useEffect } from "react";
import API from "../../api/API.js";

export default function useStaffFormOptions() {
  const [options, setOptions] = useState({
    types: null,
    workStatus: null,
    positions: null,
    departments: null,
  });

  const [loadingMessages, setLoadingMessages] = useState({
    types: "Loading records...",
    workStatus: "Loading records...",
    positions: "Loading records...",
    departments: "Loading records...",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      // Fetch Types
      const typeRes = await API.get("/usertypes");
      // Fetch Work Status
      const workRes = await API.get("/workstatus");
      // Fetch Positions
      const posRes = await API.get("/positions");
      // Fetch Departments
      const depRes = await API.get("/departments");

      setOptions({
        types: typeRes.isSuccess ? typeRes.result : [],
        workStatus: workRes.isSuccess ? workRes.result : [],
        positions: posRes.isSuccess ? posRes.result : [],
        departments: depRes.isSuccess ? depRes.result : [],
      });

      setLoadingMessages({
        types: typeRes.isSuccess ? "" : typeRes.message,
        workStatus: workRes.isSuccess ? "" : workRes.message,
        positions: posRes.isSuccess ? "" : posRes.message,
        departments: depRes.isSuccess ? "" : depRes.message,
      });
    };

    fetchOptions();
  }, []);

  return { options, loadingMessages };
}
