import Role from "../models/Role.js"
import validator from "validator"

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name ||
			!params.description
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 3 })
		: null;
	const description = params.description
		? validator.isLength(params.description, { min: 5 })
		: null;
	const active = params.active
		? validator.isBoolean(params.active)
		: null;

	if (params.name && !name) return false;
	if (params.description && !description) return false;
	if (params.active && !active) return false;
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
	const role = new Role(params);
	try {
		await role.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "role saved successfully",
			role: role,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Role couldn't be saved",
			details: e,
		});
	}
};

const READ_ALL = async (req, res) => {
	try {
		const roles = await Role.find({});
		return res.status(200).send(roles);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get roles",
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
		const role = await Role.findById(id);
		return res.status(200).send(role);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get role",
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
		const updatedRole = await Role.findByIdAndUpdate(id, {
			...updateParams
		});

		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Role updated successfully",
			role: updatedRole,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not update role",
			details: e.message,
		});
	}
};

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const role = await Role.findByIdAndDelete(id);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Role deleted successfully",
			role: role,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete role",
			details: e.message,
		});
	}
};

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };