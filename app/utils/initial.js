import Cookies from "js-cookie";

const initialState = {
  host: Cookies.get("host") || "",
  database: Cookies.get("database") || "",
  username: Cookies.get("username") || "",
  password: Cookies.get("password") || "",
  connected: false,
  query: "SELECT * FROM `Daily_Email_Log`",
  graphTitle: ""
};

export { initialState };
