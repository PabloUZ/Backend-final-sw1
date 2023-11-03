import validator from "validator";
import { promises as fs } from "fs"

import Address from "../models/Address.js";
import Client from "../models/Client.js";

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
	if (!req.file && updateParams.avatar !== undefined && updateParams.avatar === ""){
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
		const client = new Client(params);
		await client.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Client saved successfully",
			client: client,
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
			message: "Client couldn't be saved",
			details: e,
		});
	}
}

const READ_ALL = async (req, res) => {
	try {
		const clients = await Client.find({});
		return res.status(200).send(clients);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get clients",
			details: e,
		});
	}
}

const READ_BY_ID = async (req, res) => {
	const id = req.params.id;
	try {
		const client = await Client.findById(id);
		if (!client) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "Client not found"
			});
		}
		return res.status(200).send(client);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get client",
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

		const updatedClient = await Client.findByIdAndUpdate(id, {...updateParams});
		if (updateParams.avatar && updatedClient.avatar != "uploads/avatar/default.png")
			await fs.unlink(updatedClient.avatar);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Client updated successfully",
			client: updatedClient
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get client",
			details: e.message,
		});
	}
}

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const client = await Client.findByIdAndDelete(id);
		if (client.avatar && client.avatar != "uploads/avatar/default.png")
			await fs.unlink(client.avatar);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Client deleted successfully",
			client: client
		});
	}
	catch(e){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete client",
			details: e.message,
		});
	}
}

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };
