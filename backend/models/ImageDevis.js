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
            const connection = await db.execute();
            const result = await connection.execute(sql, values);
            return {...result[0], insertId: result[0].insertId };
        } catch(error) {
            console.error('Model TestForm plante');
        } finally {
            db.closeConnection();
        }
    }

    static getImagesForDevis(devisId) {
        const sql = `
        SELECT Image.id, Image.image_data FROM Devis INNER JOIN Devis_Image ON Devis.id = Devis_Image.devis_id INNER JOIN Image ON Devis_Image.image_id = Image.id WHERE Devis.id = ?;
        `;

        try {
            const result = db.query(sql, [devisId])
            return result;
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
            const connection = await db.execute();
            const result = await connection.execute(linkSql, values);
            return result[0];
        } catch (error) {
            console.error('link Image to Devis plante', error);
            throw error;
        } finally {
            db.closeConnection();
        }
    }

}

module.exports = Image;
