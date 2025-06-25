import mongoose from "mongoose";

const {Schema, model, models} = mongoose;

const loginSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Login = models.Login || model("login", loginSchema);

export default Login;
