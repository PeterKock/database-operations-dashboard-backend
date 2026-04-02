import { Router, Request, Response } from "express";
import pool from "../db/client";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health DB error:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
      message: (error as Error).message,
    });
  }
});

export default router;