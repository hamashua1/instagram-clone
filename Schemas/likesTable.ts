import { pool } from "../Database/Db.ts";

export async function createLikesTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS likes (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, post_id) -- prevents duplicate likes
    );
  `;
  await pool.query(query);
  console.log("✅ Likes table created");
}
