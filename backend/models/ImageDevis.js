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

    static getImagesForDevis(devisId) {
        const sql = `
        SELECT Image.id, Image.image_data FROM Devis INNER JOIN Devis_Image ON Devis.id = Devis_Image.devis_id INNER JOIN Image ON Devis_Image.image_id = Image.id WHERE Devis.id = ?;
        `;

        try {
            return db.query(sql, [devisId]);
        } catch (error) {
            console.error('Erreur lors de la récupération des images pour le devis', error);
            throw error;
        }
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
