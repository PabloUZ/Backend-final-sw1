import { Schema, model } from "mongoose";

const CategorySchema = Schema(
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

export default model("Category",CategorySchema,"categories");