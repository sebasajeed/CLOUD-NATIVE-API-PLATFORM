const { pool } = require("../../config/postgres");

async function createProject(name, ownerId) {
  const result = await pool.query(
    "INSERT INTO projects (name, owner_id) VALUES ($1, $2) RETURNING *",
    [name, ownerId]
  );
  return result.rows[0];
}

async function getProjectsByUser(ownerId) {
  const result = await pool.query(
    "SELECT * FROM projects WHERE owner_id = $1",
    [ownerId]
  );
  return result.rows;
}

async function deleteProject(projectId, ownerId) {
  const result = await pool.query(
    "DELETE FROM projects WHERE id = $1 AND owner_id = $2 RETURNING *",
    [projectId, ownerId]
  );
  return result.rows[0];
}

module.exports = {
  createProject,
  getProjectsByUser,
  deleteProject
};
