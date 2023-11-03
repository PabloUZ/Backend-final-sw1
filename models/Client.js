import { Schema, model } from "mongoose";
import Address from "./Address.js";

const ClientSchema = Schema(
    {
        name: String,
        avatar: {
			type: String,
			default: "uploads/avatar/default.png",
		},
        address: {
            type: Schema.Types.ObjectId,
            ref: Address,
            default: undefined
        }
    }
);

export default model("Client",ClientSchema,"clients");