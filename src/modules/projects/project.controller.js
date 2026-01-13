const {
  createProject,
  getProjectsByUser,
  deleteProject
} = require("./project.service");

async function create(req, res, next) {
  try {
    const project = await createProject(req.body.name, req.user.id);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const projects = await getProjectsByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const project = await deleteProject(req.params.id, req.user.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  list,
  remove
};
