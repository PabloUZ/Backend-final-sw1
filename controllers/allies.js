import validator from "validator";
import { promises as fs } from "fs"

import Address from "../models/Address.js";
import Ally from "../models/Ally.js";

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 1, max: 40 })
		: null;
	if (params.name && !name) return false;

	return true;
};

const CREATE = async (req, res) => {
	const params = req.body;
	if (req.file) {
		const file = req.file;
		params.avatar = file.path;
	}
	if (!req.file && updateParams.avatar !== undefined && updateParams.avatar === "") {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "File couldn't be uploaded",
		});
	}
	if (!validate(params, "POST")) {
		if (
			params.avatar &&
			params.avatar != "uploads/avatar/default.png"
		)
			await fs.unlink(params.avatar);
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (params.address) {
			params.address = await Address.findById(params.address);
		}
		const ally = new Ally(params);
		await ally.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Ally saved successfully",
			ally: ally,
		});
	} catch (e) {
		if (
			params.avatar &&
			params.avatar != "uploads/avatar/default.png"
		)
			await fs.unlink(params.avatar);
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Ally couldn't be saved",
			details: e,
		});
	}
}

const READ_ALL = async (req, res) => {
	try {
		const allies = await Ally.find({});
		return res.status(200).send(allies);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get allies",
			details: e,
		});
	}
}

const READ_BY_ID = async (req, res) => {
	const id = req.params.id;
	try {
		const ally = await Ally.findById(id);
		if (!ally) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "Ally not found"
			});
		}
		return res.status(200).send(ally);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get ally",
			details: e.message
		});
	}
}

const UPDATE = async (req, res) => {
	const id = req.params.id;
	const updateParams = req.body;
	if (req.file) {
		const file = req.file;
		updateParams.avatar = file.path;
	}
	if (!req.file && updateParams.avatar !== undefined && updateParams.avatar === ""){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "File couldn't be uploaded",
		});
	}

	if(!validate(updateParams, "PATCH")) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (updateParams.address) {
			updateParams.address = await Address.findById(updateParams.address);
		}

		const updatedAlly = await Ally.findByIdAndUpdate(id, {...updateParams});
		if (updateParams.avatar && updatedAlly.avatar != "uploads/avatar/default.png")
			await fs.unlink(updatedAlly.avatar);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Ally updated successfully",
			ally: updatedAlly
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get ally",
			details: e.message,
		});
	}
}

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const ally = await Ally.findByIdAndDelete(id);
		if (ally.avatar && ally.avatar != "uploads/avatar/default.png")
			await fs.unlink(ally.avatar);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Ally deleted successfully",
			ally: ally
		});
	}
	catch(e){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete ally",
			details: e.message,
		});
	}
}

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };
