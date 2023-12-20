import mysql from "mysql2";


export const connectDatabase = (host, database, username, password) => {
  const connection = mysql.createConnection({
    host: host,
    database: database,
    user: username,
    password: password,
    port: 3306,
  });

  connection.connect((err) => {
    if (err) {
      throw Error("Failed to establish a connection with database")
    }
  });

  return connection;
};