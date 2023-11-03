import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router()

const __dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");


router.get("", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "index.html"));
});



router.get("/addresses", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "addresses", "addresses.html"));
});

router.get("/allies", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "allies", "allies.html"));
});

router.get("/categories", (req, res) => {
	return res.sendFile(path.join(__dir, "docs","pages","categories", "categories.html"));
});

router.get("/clients", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "clients", "clients.html"));
});

router.get("/providers", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "providers", "providers.html"));
});

router.get("/roles", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "roles", "roles.html"));
});

router.get("/sedes", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "sedes", "sedes.html"));
});

router.get("/services", (req, res) => {
	return res.sendFile(path.join(__dir, "docs", "pages", "services", "services.html"));
});

router.get("/users", (req, res) => {
	return res.sendFile(path.join(__dir, "docs","pages","users", "users.html"));
});

export default router