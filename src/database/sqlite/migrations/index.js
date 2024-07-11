const sqlConnection = require("../../sqlite");
const createMoviesNotes = require("./createMoviesNotes");
const createUsers = require("./createUsers");
const createMoviesTags = require("./createMovieTags")

async function migrationsRun() {
    const schemas = [createUsers, createMoviesNotes, createMoviesTags];

    try {
        const db = await sqlConnection();

        db.run(
            "PRAGMA foreign_keys=ON"
        )

        for (const schema of schemas) {
            await db.exec(schema);
        }

        console.log("Migration Completed succesfully");

    } catch (error) {
        console.error("Migration failed", error);
    }
}

module.exports = migrationsRun;
