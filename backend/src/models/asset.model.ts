import mongoose, {Types} from "mongoose";
import {newType} from "../types/modeltypes";

const {Schema, model, models} = mongoose;

export interface IAsset {
	custodian: Types.ObjectId;
	type: string;
	user: string;
	tag: string;
	serial_no: string;
	model: string;
	group: string;
	role: string;
	entity: string;
	branch: string;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy?: newType;
	lastEditedBy?: newType;
}

const AssetSchema = new Schema<IAsset>(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		lastEditedBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		type: {
			type: String,
			required: true,
		},
		user: {
			type: String,
			required: true,
		},
		tag: {
			type: String,
			required: true,
		},
		serial_no: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		group: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		entity: {
			type: String,
			required: true,
		},
		branch: {
			type: String,
			required: true,
		},
	},
	{timestamps: true},
);

const Asset = models.Asset || model("assets", AssetSchema);

export default Asset;
