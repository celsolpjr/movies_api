const { Router } = require("express");
const MoviesNotesController = require("../controllers/MoviesNotesController");

const moviesRoutes = Router();
const moviesNotesController = new MoviesNotesController();

moviesRoutes.post("/:user_id", moviesNotesController.create);
moviesRoutes.get("/:id", moviesNotesController.show);
moviesRoutes.delete("/:id", moviesNotesController.delete);

module.exports = moviesRoutes;