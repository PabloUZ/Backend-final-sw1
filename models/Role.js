import { Schema, model } from "mongoose";

const RoleSchema = Schema(
    {
        name: {
			type: String,
			unique: true
		},
        description: String,
        active: {
			type: Boolean,
			default: false
		}
    }
);

export default model("Role",RoleSchema,"roles");