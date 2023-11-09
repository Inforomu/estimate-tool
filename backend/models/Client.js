const db = require('../config/db');

class Client {
  constructor(prenom, nom, email, phone, city, zip_code, adresse, userId) {

    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.zip_code = zip_code;
    this.adresse = adresse;
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
            author_id
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      this.prenom,
      this.nom,
      this.email,
      this.phone,
      this.city,
      this.zip_code,
      this.adresse,
      this.userId
    ];

    try {
      const result = await db.execute(sql, values)
      return result
    } catch (error) {
      throw error
    }
  }

}

module.exports = Client;