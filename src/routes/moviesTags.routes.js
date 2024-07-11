const { Router } = require("express");
const MoviesTagsController = require("../controllers/MoviesTagsController");

const routes = Router();
const moviesTagsController = new MoviesTagsController();

routes.post("/:note_id", moviesTagsController.create);

module.exports = routes;