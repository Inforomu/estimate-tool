const db = require('../config/db');

class Image {
    constructor(image_data, devis_id) {
        this.image_data = image_data;
        this.devis_id = devis_id;
    }

    async save() {
        const sql = `
        INSERT INTO Image(
            image_data, devis_id
        )
        VALUES (?, ?)
    `;

    const values = [
        this.image_data,
        this.devis_id
    ]

    try {
        const [result] = await db.execute(sql, values);
        return { insertId: result.insertId };
    } catch(error) {
        console.error('Model TestForm plante');
    }
    }

    static getAllImages() {
        const sql = 'SELECT * FROM image';
        return db.query(sql);
    }

}

module.exports = Image;