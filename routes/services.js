import express from "express";

const router = express.Router();

import {
	CREATE,
	DELETE,
	READ_ALL,
	READ_BY_ID,
	UPDATE,
} from "../controllers/services.js";
import auth from "../middlewares/auth.js";

router.post("/new", [auth], CREATE);
router.get("/", READ_ALL);
router.get("/:id", READ_BY_ID);
router.patch("/:id", [auth], UPDATE);
router.delete("/:id", [auth], DELETE);

export default router;