import express from "express";

const router = express.Router();

import {
	CREATE,
	DELETE,
	READ_ALL,
	READ_BY_ID,
	UPDATE,
} from "../controllers/categories.js";

router.post("/new", CREATE);
router.get("/", READ_ALL);
router.get("/:id", READ_BY_ID);
router.patch("/:id", UPDATE);
router.delete("/:id", DELETE);

export default router;
