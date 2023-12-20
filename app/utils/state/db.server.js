import mysql from "mysql2";

export const connectDatabase = (host, database, username, password) => {
  return mysql.createConnection({
    host: host,
    database: database,
    user: username,
    password: password,
    port: 3306,
  });
};
