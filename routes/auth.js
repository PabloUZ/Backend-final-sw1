import express from "express";

const router = express.Router();

import {
	LOGIN
} from "../controllers/users.js"

router.post("/login", LOGIN);


export default router;