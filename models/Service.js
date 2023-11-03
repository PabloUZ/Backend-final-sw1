import { Schema, model } from "mongoose";
import Category from "./Category.js";

const ServiceSchema = Schema(
    {
        name: String,
        category: {
            type: Schema.Types.ObjectId,
            ref: Category,
            default: undefined
        },
        description: String,
        active: {
			type: Boolean,
			default: false
		}
    }
);

export default model("Service",ServiceSchema,"services");