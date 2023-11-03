import Address from "../models/Address.js"
import validator from "validator"

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.country ||
			!params.department ||
			!params.municipality ||
			!params.nomenclature
		)
	)
		return false;
	const country = params.country
		? validator.isLength(params.country, { min: 5 })
		: null;
	const department = params.department
		? validator.isLength(params.department, { min: 5 })
		: null;
	const municipality = params.municipality
		? validator.isLength(params.municipality, { min: 5 })
		: null;
	const nomenclature = params.nomenclature
		? validator.isLength(params.nomenclature, { min: 5 })
		: null;

	if (params.country && !country) return false;
	if (params.department && !department) return false;
	if (params.municipality && !municipality) return false;
	if (params.nomenclature && !nomenclature) return false;
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
	const address = new Address(params);
	try {
		await address.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "address saved successfully",
			address: address,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Address couldn't be saved",
			details: e,
		});
	}
};

const READ_ALL = async (req, res) => {
	try {
		const addresses = await Address.find({});
		return res.status(200).send(addresses);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get addresses",
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
		const address = await Address.findById(id);
		return res.status(200).send(address);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get address",
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
		const updatedAddress = await Address.findByIdAndUpdate(id, {
			...updateParams
		});

		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Address updated successfully",
			address: updatedAddress,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not update address",
			details: e.message,
		});
	}
};

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const address = Address.findByIdAndDelete(id);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Address deleted successfully",
			address: address,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete address",
			details: e.message,
		});
	}
};

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };