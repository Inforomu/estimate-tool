const db = require('../config/db');

class DevisData {
    constructor(data) {
        this.power_contract = data.power_contract;
        this.power_yg = data.power_yg;
        this.contract = data.contract;
        this.electric_controller = data.electric_controller;
        this.telereport = data.telereport;
        this.wifi = data.wifi;
        this.mobile = data.mobile;
        this.ground_res = data.ground_res;
        this.neutral_system = data.neutral_system;
        this.breaker = data.breaker;
        this.distance = data.distance;
        this.secure = data.secure;
        this.type_e = data.type_e;
        this.dispo_td = data.dispo_td;
        this.power_charging = data.power_charging;
        this.charge_points = data.charge_points;
        this.box_nb = data.box_nb;
        this.author_id = data.author_id;
        this.client_id = data.client_id;
        this.observation = data.observation;
        this.id = data.id;
    }

    async save() {
        const sql = `
        INSERT INTO Devis (
            power_contract, power_yg, contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging,
            charge_points, box_nb, author_id, client_id, observation
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            this.power_contract,
            this.power_yg,
            this.contract,
            this.electric_controller,
            this.telereport,
            this.wifi,
            this.mobile,
            this.ground_res,
            this.neutral_system,
            this.breaker,
            this.distance,
            this.secure,
            this.type_e,
            this.dispo_td,
            this.power_charging,
            this.charge_points,
            this.box_nb,
            this.author_id,
            this.client_id,
            this.observation,
        ];

        try {
            const [result] = await db.execute(sql, values);
            return { insertId: result.insertId };
        } catch (error) {
            throw error;
        }
    }

    static async find() {
        let sql = `
        SELECT Devis.id, Devis.power_contract, Devis.power_yg, Devis.contract, Devis.electric_controller, Devis.telereport, Devis.wifi, Devis.mobile, Devis.ground_res, Devis.neutral_system, Devis.breaker, Devis.distance, Devis.secure, Devis.type_e, Devis.dispo_td, Devis.power_charging, Devis.charge_points, Devis.box_nb, Devis.observation, Users.email AS user_email, Clients.email AS client_email, Clients.ville AS client_ville, Clients.zipcode AS client_zipcode FROM Devis INNER JOIN Users ON Devis.author_id = Users.id LEFT JOIN Clients ON Devis.client_id = Clients.id;
        `;
        try {
            const [result] = await db.execute(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async findOne(id) {
        let sql = `
        SELECT Devis.id, Devis.power_contract, Devis.power_yg, Devis.contract, Devis.electric_controller, Devis.telereport, Devis.wifi, Devis.mobile, Devis.ground_res, Devis.neutral_system, Devis.breaker, Devis.distance, Devis.secure, Devis.type_e, Devis.dispo_td, Devis.power_charging, Devis.charge_points, Devis.box_nb, Devis.observation,
        Users.email AS user_email,
        Clients.email AS client_email
        FROM Devis
        INNER JOIN Users ON Devis.author_id = Users.id
        INNER JOIN Clients ON Devis.client_id = Clients.id
        WHERE Devis.id = ?;
          `;
    
        try {
          const result = await db.execute(sql, [id]);
          return result;
        } catch (error) {
          throw error
        }
    }

    static async updateOneDevis(id, updatedFields) {

        const fieldNames = Object.keys(updatedFields);

        const setUpdatedFields = fieldNames.map((fieldName) => `${fieldName} = ?`).join(', ');
        let sql = `
        UPDATE Devis
        SET ${setUpdatedFields}
        WHERE id = ?;
        `
        const values = fieldNames.map((fieldName) => updatedFields[fieldName]);
        values.push(id);
        try {
            const result = await db.execute(sql, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async linkImageId(imageId) {
        const linkSql = `
        INSERT INTO Devis_Image (
            devis_id, image_id
        )
        VALUES (?, ?)
        `;

        const updateValues = [this.id, imageId];

        try {
            const [result] = await db.execute(linkSql, updateValues);
            return { insertId: result.insertId };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DevisData;
