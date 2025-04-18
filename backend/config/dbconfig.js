const mongoose = require("mongoose");
const { DB_URI } = require("../secrets");

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

const dbConn = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log("Connected to: " + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { dbConn };
