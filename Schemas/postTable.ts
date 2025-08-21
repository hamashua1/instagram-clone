import { pool } from "../Database/Db.ts";

export async function createPostsTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      media_url TEXT NOT NULL, -- S3 URL
      caption TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await pool.query(query);
    console.log("✅ Posts table created");
}
