const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class MoviesTagsController {
    async create(request, response) {
        const { note_id } = request.params;
        const { names } = request.body;

        const db = await sqliteConnection();

        const note = await db.get(
            "SELECT * FROM movies_notes WHERE id = (?)", [note_id]
        )

        if (!note) {
            throw new AppError("Note not exists");
        }

        for (const name of names) {
            await db.run(
                "INSERT INTO movies_tags (name, note_id, user_id) VALUES (?, ?, ?)",
                [name, note_id, note.user_id]
            )
        }

        return response.status(200).json();

    }
}

module.exports = MoviesTagsController;