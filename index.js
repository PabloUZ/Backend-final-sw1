import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config/env.js";
import { connection } from "./config/database.js";

import docsRoutes from "./docs/routes/docs.js";

import userRoutes from "./routes/users.js";
import addressRoutes from "./routes/addresses.js";
import roleRoutes from "./routes/roles.js";
import allyRoutes from "./routes/allies.js";
import clientRoutes from "./routes/clients.js";
import providerRoutes from "./routes/providers.js";
import categoryRoutes from "./routes/categories.js";
import sedeRoutes from "./routes/sedes.js";
import serviceRoutes from "./routes/services.js";
import authRoutes from "./routes/auth.js";

const __dir = path.dirname(fileURLToPath(import.meta.url));

const start = async () => {
	try {
		await connection()
			.then(() => console.log("Connection successful"))
			.catch((err) => {
				throw new Error("Connection error: " + err);
			});

		const app = express();

		app.use(express.urlencoded({ extended: true }));

		app.use(express.static(path.join(__dir, "docs")));

		app.use(cors());

		app.use("/docs", docsRoutes);

		app.use("/api/v1/users", userRoutes);
		app.use("/api/v1/addresses", addressRoutes);
		app.use("/api/v1/roles", roleRoutes);
		app.use("/api/v1/allies", allyRoutes);
		app.use("/api/v1/clients", clientRoutes);
		app.use("/api/v1/providers", providerRoutes);
		app.use("/api/v1/categories", categoryRoutes);
		app.use("/api/v1/sedes", sedeRoutes);
		app.use("/api/v1/services", serviceRoutes);
		app.use("/api/v1/auth", authRoutes);

		app.use((req, res, next) => {
			const error = new Error("Not implemented");
			error.status = 501;
			next(error);
		});

		// Middleware para manejar errores
		app.use((err, req, res, next) => {
			res.status(err.status || 500).json({
				error: {
					message: err.message,
				},
			});
		});

		app.listen(PORT, () => {
			console.log("Server is UP!");
		});
	} catch (e) {
		console.log("Server is DOWN!\n" + e.message);
	}
};
start();
