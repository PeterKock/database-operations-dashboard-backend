import express from "express";
import healthRoutes from "./routes/healthRoutes";
import backupJobRoutes from "./routes/backupJobRoutes";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/backup-jobs", backupJobRoutes);

export default app;