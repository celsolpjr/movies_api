const sqlConnection = require("../../sqlite");
const createMoviesNotes = require("./createMoviesNotes");
const createUsers = require("./createUsers");

async function migrationsRun() {
    const schemas = [createUsers, createMoviesNotes];

    try {
        const db = await sqlConnection();

        for (const schema of schemas) {
            await db.exec(schema);
        }

        console.log("Migration Completed succesfully");

    } catch (error) {
        console.error("Migration failed", error);
    }
}

module.exports = migrationsRun;
