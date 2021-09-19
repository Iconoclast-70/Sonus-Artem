require("dotenv").config();
const Musixmatch = require("musixmatch");
const Discogs = require("disconnect").Client;

/* DISCOGS ************************************/

const discogArtist = function () {
  const db = new Discogs().database();
  db.getRelease()
    .then(function (release) {
      return db.getArtist(release.artists[0].id);
    })
    .then(function (artist) {
      console.log(artist.name);
    });
};
exports.discogArtist = discogArtist;

/* MUSIXMATCH *********************************/
const msx = Musixmatch({
  apikey: process.env.API_MUSIXMATCH_KEY,
  baseURL: "https://api.musixmatch.com/ws/1.1/",
  corsURL: "",
  format: "json",
});

const getArtist = function (artistName) {
  return msx
    .artistSearch({ q_artist: artistName, format: "json" })
    .then(function (data) {
      return data.artist_list.filter(
        (artist) => artist.artist.artist_name === artistName
      );
    })
    .catch(function (err) {
      return err;
    });
};
exports.getArtist = getArtist;

const getAlbums = function (artistID) {
  return msx
    .artistAlbums({
      artist_id: artistID,
      g_album_name: 1,
      page_size: 100,
      format: "json",
    })
    .then(function (data) {
      return data.album_list;
    })
    .catch(function (err) {
      return err;
    });
};
exports.getAlbums = getAlbums;

const getAlbumTracks = function (albumID) {
  return msx
    .albumTracks({
      album_id: albumID,
      format: "json",
    })
    .then(function (data) {
      return data.track_list;
    })
    .catch(function (err) {
      return err;
    });
};
exports.getAlbumTracks = getAlbumTracks;

const getTrackLyrics = function (trackID) {
  return msx
    .trackLyrics({
      track_id: trackID,
    })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      return err;
    });
};
exports.getTrackLyrics = getTrackLyrics;
