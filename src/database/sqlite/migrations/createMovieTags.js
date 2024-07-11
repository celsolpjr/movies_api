const movie_tags = `
    CREATE TABLE IF NOT EXISTS movies_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_id INTEGER,
        user_id INTEGER,
        name VARCHAR,
        FOREIGN KEY(note_id) REFERENCES movies_notes(id) ON DELETE CASCADE,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`;

module.exports = movie_tags;