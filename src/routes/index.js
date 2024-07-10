const { Router } = require("express");

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./moviesNotes.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);

module.exports = routes;

