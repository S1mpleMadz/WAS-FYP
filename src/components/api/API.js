import API_URL from "./apiURL.js";

export const API = {};

API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, dataObj) => {
  let requestObj = { method };

  if (dataObj)
    requestObj = {
      ...requestObj,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    };

  try {
    const response = await fetch(API_URL + endpoint, requestObj);
    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result }
      : {
          isSuccess: false,
          message: result?.message || `Error: status code ${response.status}`,
        };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
