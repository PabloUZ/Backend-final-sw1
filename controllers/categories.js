import Category from "../models/Category.js"
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
	const category = new Category(params);
	try {
		await category.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Category saved successfully",
			category: category,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Category couldn't be saved",
			details: e,
		});
	}
};

const READ_ALL = async (req, res) => {
	try {
		const categories = await Category.find({});
		return res.status(200).send(categories);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get categories",
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
		const category = await Category.findById(id);
		return res.status(200).send(category);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get category",
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
		const updatedCategory = await Category.findByIdAndUpdate(id, {...updateParams});

		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Category updated successfully",
			category: updatedCategory,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not update category",
			details: e.message,
		});
	}
};

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const category = await Category.findByIdAndDelete(id);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Category deleted successfully",
			category: category,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete category",
			details: e.message,
		});
	}
};

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };