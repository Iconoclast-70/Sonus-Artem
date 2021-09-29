require("dotenv").config();
const Musixmatch = require("musixmatch");
const Discogs = require("disconnect").Client;
const genius = require("genius-lyrics-api");
const LastFM = require("last-fm");
const lastfm = new LastFM(process.env.LAST_FM_API_KEY, {
  userAgent: "Sonus Artem (http://localhost:3000/api/artists)",
});

/* LAST FM ************************************/

const fmArtistSearch = function (artist) {
  lastfm.artistSearch({ q: artist }, (err, data) => {
    console.log("FM ARTIST SEARCH ", data);
    return data;
  });
};
exports.fmArtistSearch = fmArtistSearch;

const fmAlbumSearch = function (album) {
  lastfm.albumSearch({ q: album }, (err, data) => {
    console.log("FM ALBUM SEARCH ", data);
    return data;
  });
};
exports.fmAlbumSearch = fmAlbumSearch;

const fmTrackSearch = function (track) {
  lastfm.trackSearch({ q: track }, (err, data) => {
    console.log("FM TRACK SEARCH ", data);
    return data;
  });
};
exports.fmTrackSearch = fmTrackSearch;

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

/* GENIUS API *********************************/

const getGeniusLyrics = function (artist, track) {
  const options = {
    apiKey: process.env.GENIUS_ACCESS_TOKEN,
    title: track,
    artist: artist,
    optimizeQuery: true,
  };

  return genius.getLyrics(options).then((lyrics) => {
    console.log(lyrics);
    return lyrics;
  });
};
exports.getGeniusLyrics = getGeniusLyrics;

const getGeniusSong = function (artist, track) {
  const options = {
    apiKey: process.env.GENIUS_ACCESS_TOKEN,
    title: track,
    artist: artist,
    optimizeQuery: true,
  };

  return genius.getSong(options).then((song) => {
    console.log(`
    ${song.id}
    ${song.title}
    ${song.url}
    ${song.albumArt}
    ${song.lyrics}`);
    return song;
  });
};

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
