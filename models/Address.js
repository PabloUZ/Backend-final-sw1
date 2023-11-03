import { Schema, model } from "mongoose";

const AddressSchema = Schema(
    {
        country: String,
        department: String,
        municipality: String,
        nomenclature: String,
    }
);

export default model("Address",AddressSchema,"addresses");