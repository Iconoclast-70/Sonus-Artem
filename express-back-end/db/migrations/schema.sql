DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS songs CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE artists (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  mx_artist_id VARCHAR(255) NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  mx_album_id VARCHAR(255) NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  mx_artist_id VARCHAR(255) NOT NULL
);