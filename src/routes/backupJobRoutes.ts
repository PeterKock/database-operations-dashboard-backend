import { Router, Request, Response } from "express";
import pool from "../db/client";

const router = Router();

router.post("/simulate", async (req: Request, res: Response) => {
  try {
    const startedAt = new Date();
    const completedAt = new Date(startedAt.getTime() + 5000);
    const durationSeconds = 5;

    const query = `
      INSERT INTO backup_jobs (
        job_name,
        status,
        started_at,
        completed_at,
        duration_seconds,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      "nightly-backup",
      "SUCCESS",
      startedAt,
      completedAt,
      durationSeconds,
      "Backup completed successfully"
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Backup job simulated successfully",
      job: result.rows[0]
    });
  } catch (error) {
    console.error("Failed to simulate backup job:", error);

    res.status(500).json({
      message: "Failed to simulate backup job",
      error: (error as Error).message
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM backup_jobs
      ORDER BY started_at DESC
    `);

    res.status(200).json({
      jobs: result.rows
    });
  } catch (error) {
    console.error("Failed to fetch backup jobs:", error);

    res.status(500).json({
      message: "Failed to fetch backup jobs",
      error: (error as Error).message
    });
  }
});

export default router;