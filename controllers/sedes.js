import Sede from "../models/Sede.js"
import validator from "validator"
import Address from "../models/Address.js";

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name ||
			!params.contact
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 3 })
		: null;
	const contact = params.contact
		? validator.isLength(params.contact, { min: 5 })
		: null;

	if (params.name && !name) return false;
	if (params.contact && !contact) return false;
	return true;
};

const CREATE = async (req, res) => {
	const params = req.body;
	if (!validate(params, "POST")) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		const exist = await Sede.find({name: params.name})
		if(exist && exist.length > 0) throw new Error(`name '${params.name}' already exists`)
		if (params.address) {
			params.address = await Address.findById(params.address);
		}
		const sede = new Sede(params);
		await sede.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "sede saved successfully",
			sede: sede,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Sede couldn't be saved",
			details: e,
		});
	}
};

const READ_ALL = async (req, res) => {
	try {
		const sedes = await Sede.find({});
		return res.status(200).send(sedes);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get sedes",
			details: e,
		});
	}
};

const READ_BY_ID = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "ID not received",
		});
	}
	try {
		const sede = await Sede.findById(id);
		return res.status(200).send(sede);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get sede",
			details: e.message,
		});
	}
};

const UPDATE = async (req, res) => {
	const id = req.params.id;
	const updateParams = req.body;
	if (!id) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "ID not received",
		});
	}
	if (!validate(updateParams, "PATCH")) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		const exist = await Sede.find({name: updateParams.name})
		if(updateParams.name && exist && exist.length > 0) throw new Error(`name '${updateParams.name}' already exists`)
		if (updateParams.address) {
			updateParams.address = await Address.findById(updateParams.address);
		}
		const updatedSede = await Sede.findByIdAndUpdate(id, {
			...updateParams
		});

		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Sede updated successfully",
			sede: updatedSede,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not update sede",
			details: e.message,
		});
	}
};

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const sede = await Sede.findByIdAndDelete(id);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Sede deleted successfully",
			sede: sede,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete sede",
			details: e.message,
		});
	}
};

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };