import { pool } from "../Database/Db.ts";

export async function createLikesTable() {
    const query = `
  CREATE TABLE IF NOT EXISTS likes (
  like_id  SERIAL PRIMARY KEY,
  user_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id  INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, post_id)    -- prevents duplicate likes
);
  `;
    await pool.query(query);
    console.log("✅ Likes table created");
}
