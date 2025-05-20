import { Types } from "mongoose";

export type newType = Types.ObjectId;

export interface IAsset {
  type: string;
  user: string;
  tag: string;
  serial_no: string;
  model: string;
  group: string;
  role: string;
  bank: string;
  branch: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: newType;
  lastEditedBy?: newType;
}

export interface IMovement {
  serial_no: string;
  tag: string;
  from_location: string;
  to_location: string;
  type: string;
  bank: string;
  reason: string;
  newCustodian: string;
  createdAt?: Date;
  createdBy?: newType;
  lastEditedBy?: newType;
}

export interface IOther {
  type: string;
  tag: string;
  serial_no: string;
  bank: string;
  branch: string;
  createdBy: newType;
  lastEditedBy: newType;
  createdAt?: Date;
  updatedAt?: Date;
}
