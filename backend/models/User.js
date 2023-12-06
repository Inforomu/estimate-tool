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
            const connection = await db.execute();
            const result = await connection.execute(sql, values);
            return result[0];
        } catch (error) {
          throw error;
        } finally {
          db.closeConnection();
        }
    }

    static async findByEmail(email) {
        const sql = `
            SELECT * FROM Users WHERE email = ?;
        `;
    
        try {
            const connection = await db.execute();
            const result = await connection.execute(sql, [email]);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            db.closeConnection();
        }
    }

    static async findById(id) {
        const sql = `
            SELECT * FROM Users WHERE id = ?;
        `;
    
        try {
            const connection = await db.execute();
            const result = await connection.execute(sql, [id]);
            console.log(result);
            return result;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          db.closeConnection();
        }
    }
}

module.exports = User;
