import { Schema, model } from "mongoose";
import Address from "./Address.js";

const AllySchema = Schema({
	name: String,
	avatar: {
		type: String,
		default: "uploads/avatar/default.png",
	},
	address: {
		type: Schema.Types.ObjectId,
		ref: Address,
		default: undefined,
	},
});

export default model("Ally",AllySchema,"allies");