const { pool } = require("../../config/postgres");
const { hashPassword, comparePassword } = require("../../utils/password");

async function createUser(email, password) {
  const passwordHash = await hashPassword(password);

  const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
    [email, passwordHash]
  );

  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) return null;

  return user;
}

module.exports = {
  createUser,
  validateUser
};
