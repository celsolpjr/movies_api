const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");

class UsersController {
    async create(request, response) {
        const {name, email, password} = request.body;

        const db = await sqliteConnection();

        const checkIfUserExists = await db.get(
            "SELECT * FROM users WHERE email = (?)",
            [email]
        )

        if (checkIfUserExists) {
            throw new AppError("Email already registered");
        }

        const hashedPassword = await hash(password, 8);

        await db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        )

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const db = await sqliteConnection();
        const user = await db.get(
            "SELECT * FROM users WHERE id = (?)", [id]
        )

        if (!user) {
            throw new AppError("User not exist");
        }

        const emailExist = await db.get(
            "SELECT * FROM users WHERE email = (?)", [email]
        )

        if (emailExist && user.id != emailExist.id) {
            throw new AppError("Email already registered");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError("old password not informed");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("Old password is different that informed");
            }

            user.password = await hash(password, 8);
        }

        db.run(
            "UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?",
            [user.name, user.email, user.password, id]
        )

        return response.status(200).json();
    }
}

module.exports = UsersController;