import Cookies from "js-cookie";

const initialState = {
  host: Cookies.get("host") || "65817b57.dorsy.net",
  database: Cookies.get("database") || "d03f016a",
  username: Cookies.get("username") || "d03f016a",
  password: Cookies.get("password") || "Nvus3JkuHYzYDfGFPk6V",
  connected: false,
  query: "SELECT * FROM `Daily_Email_Log`",
  graphTitle: ""
};

export { initialState };
