const db = require('../config/db');

class User {
    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    async save() {
        const sql = `
            INSERT INTO Users (email, password, role)
            VALUES (?, ?, ?)
        `;

        const values = [this.email, this.password, this.role];

        try {
            const [result] = await db.execute(sql, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = `
            SELECT * FROM Users WHERE email = ?
        `;
    
        try {
            const result = await db.execute(sql, [email]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        const sql = `
            SELECT * FROM Users WHERE id = ?
        `;
    
        try {
            const result = await db.execute(sql, [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
