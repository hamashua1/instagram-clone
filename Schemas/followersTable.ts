import { pool } from "../Database/Db.ts";

export async function createFollowersTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS followers (
      id SERIAL PRIMARY KEY,
      follower_id INT REFERENCES users(id) ON DELETE CASCADE,
      following_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(follower_id, following_id) -- prevents duplicate follows
    );
  `;
    await pool.query(query);
    console.log("✅ Followers table created");
}
