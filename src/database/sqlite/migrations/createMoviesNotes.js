const createMoviesNotes = `
    CREATE TABLE IF NOT EXISTS movies_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR,
        description VARCHAR,
        rating INTEGER,
        user_id  INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`;

module.exports = createMoviesNotes;