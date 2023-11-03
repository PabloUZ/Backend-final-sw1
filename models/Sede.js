import { Schema, model } from "mongoose";
import Address from "./Address.js";


const SedeSchema = Schema(
    {
        name: {
			type: String,
			unique: true,
		},
        address: {
            type: Schema.Types.ObjectId,
            ref: Address,
            default: undefined
        },
        contact: String
    }
);

export default model("Sede",SedeSchema,"sedes");