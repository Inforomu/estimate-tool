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
      const result = await db.execute(sql, values)
      return result
    } catch (error) {
      throw error
    }
  }

  static async find() {
    let sql = `
    SELECT Clients.id, Clients.prenom, Clients.nom, Clients.email, Clients.telephone, Clients.ville, Clients.zipcode, Clients.adresse, Clients.description, Clients.created_at, Clients.author_id,
    Users.email AS user_email
    FROM Clients
    INNER JOIN Users ON Clients.author_id = Users.id;
      `;

    try {
      const [result] = await db.execute(sql);
      return result;
    } catch (error) {
      throw error
    }
  }

}

module.exports = Client;