require("dotenv").config();
const { Pool } = require("pg");
const { DB_USER, DB_HOST, DB_PASS, DB_NAME } = process.env;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_NAME
});

async function register(name, email, pword) {
  return await pool
    .query(
      `INSERT INTO users(name, email, password)
            VALUES($1, $2, $3) RETURNING *`,
      [name, email, pword]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
};
exports.register = register;

const addArtist = (mxArtist, mxArtistId) => {
  return pool
    .query(
      `INSERT INTO artists(name, mx_artist_id)
            VALUES($1, $2) RETURNING *`,
      [mxArtist, mxArtistId]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
};
exports.addArtist = addArtist;

const addArtistAlbums = (mxAlbums, mxArtistId) => {
  const queryParams = [];

  return pool
    .query(
      `INSERT INTO albums(name, mx_album_id)
            VALUES($1, $2) RETURNING *`,
      queryParams
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
};
exports.addArtistAlbums = addArtistAlbums;
