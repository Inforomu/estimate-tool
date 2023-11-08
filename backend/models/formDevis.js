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
    }

    async save() {
        const sql = `
        INSERT INTO Devis (
            power_contract, power_yg, contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging,
            charge_points, box_nb
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            this.box_nb
        ];

        try {
            const [result] = await db.execute(sql, values);
            return { insertId: result.insertId };
        } catch(error) {
            throw error;
        }
    }
}

module.exports = DevisData;
