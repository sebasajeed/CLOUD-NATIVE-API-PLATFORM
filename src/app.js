const express = require("express");
const requestMiddleware = require("./middlewares/request.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(requestMiddleware);

const healthRoutes = require("./health/health.routes");
const authRoutes = require("./modules/auth/auth.routes");

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

const projectRoutes = require("./modules/projects/project.routes");
app.use("/projects", projectRoutes);


app.use(errorMiddleware);

module.exports = app;
