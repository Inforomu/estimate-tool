require('dotenv').config();
const mysql = require('mysql2/promise');
const { Client } = require('ssh2');

const sshConfig = {
  host: process.env.SSH_HOST,
  username: process.env.SSH_NAME,
  privateKey: require('fs').readFileSync('../../vale.pem')
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let dbConnection = null;

const execute = async () => {
  if (dbConnection) {
    return dbConnection;
  } else {
    return new Promise((resolve, reject) => {
      const ssh = new Client();

      ssh.on('ready', () => {
        ssh.forwardOut(
          // bind to local port 3306
          '127.0.0.1',
          // connect to remote host and port
          3306,
          dbConfig.host,
          3306,
          (err, stream) => {
            if (err) reject(err);
            const db = mysql.createConnection({
              host: dbConfig.host,
              user: dbConfig.user,
              password: dbConfig.password,
              database: dbConfig.database,
              stream: stream, // pass the SSH tunnel through to the mysql connection
            });
            dbConnection = db;
            resolve(db);
          }
        );
      });

      ssh.on('error', (err) => {
        reject(err);
      });

      ssh.connect(sshConfig);
    });
  }
};

const closeConnection = () => {
  if (dbConnection) {
    dbConnection.then((db) => {
      db.end();
    });
    dbConnection = null;
  }
};

module.exports = { execute, closeConnection };
