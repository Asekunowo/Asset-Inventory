import { connect } from "mongoose";
import { DB_URI } from "../secrets";

const config = {
  user: "tireddev",
  password: "tireddev25",
  server: "localhost",
  database: "tireddev",
  options: {
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS01",
  },
  port: 1433,
};

export const dbConn = async () => {
  try {
    const conn = await connect(DB_URI, {
      dbName: 'asset_inventory'});
    console.log("Connected to: " + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
