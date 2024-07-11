const { Router } = require("express");

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./moviesNotes.routes");
const tagsRoutes = require("./moviesTags.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;

