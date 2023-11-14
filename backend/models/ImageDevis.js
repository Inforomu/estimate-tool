const db = require('../config/db');

class Image {
    constructor(image_data) {
        this.image_data = image_data;
    }

    async save() {
        const sql = `
        INSERT INTO Image(
            image_data
        )
        VALUES (?)
    `;

    const values = [
        this.image_data
    ]

    try {
        const [result] = await db.execute(sql, values);
        return { insertId: result.insertId };
    } catch(error) {
        console.error('Model TestForm plante');
    }
    }

    static getAllImages() {
        const sqlImgData = 'SELECT Image.image_data FROM Image';
        return db.query(sqlImgData);
    }

    static getAllImagesData() {
        const sql = 'SELECT * FROM Image';
        return db.query(sql);
    }

    async linkToDevis(devisId) {
        const linkSql = `
        INSERT INTO Devis_Image (
            devis_id, image_id
        )
        VALUES (?, ?)
    `;

        const values = [devisId, this.insertId];

        try {
            await db.execute(linkSql, values);
        } catch (error) {
            console.error('link Image to Devis plante', error);
            throw error;
        }
    }

}

module.exports = Image;