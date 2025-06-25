import {connect} from "mongoose";
import {DB_URI, NODE_ENV} from "../secrets";

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
			dbName: NODE_ENV === "production" || NODE_ENV === "development" ? "asset_inventory" : "asset_inventory_test",
		});
		console.log("Connected to: " + conn.connection.host);
		return true;
	} catch (error: any) {
		console.error(error.message);
		process.exit(1);
	}
};
