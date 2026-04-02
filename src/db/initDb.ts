import fs from "fs";
import path from "path";
import pool from "./client";

const initializeDatabase = async (): Promise<void> => {
  try {
    const sqlPath = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");

    await pool.query(sql);

    console.log("Database initialized successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
};

initializeDatabase();