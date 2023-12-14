const db = require('../config/db');

class Client {
  constructor(prenom, nom, email, phone, city, zip_code, adresse, description, userId) {

    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.zip_code = zip_code;
    this.adresse = adresse;
    this.description = description;
    this.userId = userId;
  }
  async save() {

    let sql = `
        INSERT INTO Clients(
            prenom,
            nom,
            email,
            telephone,
            ville,
            zipcode,
            adresse,
            description,
            author_id
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      this.prenom,
      this.nom,
      this.email,
      this.phone,
      this.city,
      this.zip_code,
      this.adresse,
      this.description,
      this.userId
    ];

    try {
      const connection = await db.execute();
      const result = await connection.execute(sql, values);
      return result[0];
    } catch (error) {
      throw error 
    } finally {
      db.closeConnection();
    }
  }

  static async find() {
    let sql = `
    SELECT Clients.id, Clients.prenom, Clients.nom, Clients.email, Clients.telephone, Clients.ville, Clients.zipcode, Clients.adresse, Clients.description, Clients.created_at, Clients.author_id, Clients.adresse,
    Users.email AS user_email
    FROM Clients
    INNER JOIN Users ON Clients.author_id = Users.id;
      `;

    try {
      const connection = await db.execute();
      const result = await connection.execute(sql);
      return result[0];
    } catch (error) {
      throw error
    } finally {
      db.closeConnection();
    }
  }

  static async findOne(id) {
    let sql = `
    SELECT Clients.id, Clients.prenom, Clients.nom, Clients.email, Clients.telephone, Clients.ville, Clients.zipcode, Clients.adresse, Clients.description, Clients.created_at, Clients.author_id, Clients.adresse,
    Users.email AS user_email
    FROM Clients
    INNER JOIN Users ON Clients.author_id = Users.id
    WHERE Clients.id = ?;
      `;

    try {
      const connection = await db.execute();
      const result = await connection.execute(sql, [id]);
      console.log(result);
      return result[0];
    } catch (error) {
      throw error
    } finally {
      db.closeConnection();
    }
  }

  static async getDevis(clientId) {
    let sqlGetDevis = `
    SELECT Devis.id, Devis.power_contract, Devis.power_yg, Devis.contract, Devis.electric_controller,
             Devis.telereport, Devis.wifi, Devis.mobile, Devis.ground_res, Devis.neutral_system,
             Devis.breaker, Devis.distance, Devis.secure, Devis.type_e, Devis.dispo_td,
             Devis.power_charging, Devis.charge_points, Devis.box_nb, Devis.author_id, Devis.client_id,
             Devis.created_at, Devis.observation
    FROM Devis
    WHERE Devis.client_id = ?;
    `;

    try {
      const connection = await db.execute();
      const result = await connection.execute(sqlGetDevis, [clientId]);
      return result[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateOne( id, prenom, nom, email, telephone, ville, zipcode, adresse, description ) {
    let sql = `
        UPDATE Clients
        SET prenom = ?,
          nom = ?,
          email = ?,
          telephone = ?,
          adresse = ?,
          zipcode = ?,
          ville = ?,
          description = ?
        WHERE id = ?;
      `;

    const values = [  prenom, nom, email, telephone,adresse, zipcode, ville, description, id ];

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
}

module.exports = Client;