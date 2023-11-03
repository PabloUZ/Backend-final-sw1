import { Schema, model } from "mongoose"
import Role from "./Role.js"
import Address from "./Address.js";

const UserSchema = Schema({
	name: String,
	lastname: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	active: {
		type: Boolean,
		default: false,
	},
	avatar: {
		type: String,
		default: "uploads/avatar/default.png",
	},
	address: {
		type: Schema.Types.ObjectId, // TODO: <Schema.Types.Mixed> para mostrar el objeto completo
		ref: Address,
		default: null,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: Role,
		default: null,
	},
});
export default model("User", UserSchema, "users");