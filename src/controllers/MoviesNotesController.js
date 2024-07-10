const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class MoviesNotesController {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating } = request.body;

        const db = await sqliteConnection();

        const checkIfUserExists = await db.get(
            "SELECT * FROM users WHERE id = (?)", [user_id]
        )

        if (!checkIfUserExists) {
            throw new AppError("User not exists");
        }

        await db.run(
            "INSERT INTO movies_notes (title, description, rating, user_id) VALUES (?, ?, ?, ?)",
            [title, description, rating, user_id]
        )

        return response.status(201).json();

    }

    async show(request, response) {
        const { id } = request.params;

        const db = await sqliteConnection();

        const movieNote = await db.get(
            "SELECT * FROM movies_notes WHERE id = (?)", [id]
        )

        if (!movieNote) {
            throw new AppError("Movie Note not exists");
        }

        return response.status(200).json(movieNote);
    }

    async delete(request, response) {
        const { id } = request.params;

        const db = await sqliteConnection();

        const movieNote = await db.get(
            "SELECT * FROM movies_notes WHERE id = (?)", [id]
        )

        if (!movieNote) {
            throw new AppError("Movies Note not exists");
        }

        await db.run(
            "DELETE FROM movies_notes WHERE id = (?)", [id]
        )

        return response.status(200).json();
    }
}

module.exports = MoviesNotesController;