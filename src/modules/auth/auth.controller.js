const { createUser, validateUser } = require("./auth.service");
const { signToken } = require("../../utils/jwt");

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await createUser(email, password);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ userId: user.id });

    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login
};
