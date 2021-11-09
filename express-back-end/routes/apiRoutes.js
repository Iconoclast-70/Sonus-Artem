const express = require("express");
const router = express.Router();
const mxapp = require("../application");
const db = require("../db/database");

router.post("/api/tracks", (req, res) => {
  return mxapp.getAlbumTracks(req.body.id).then((tracks) => {
    console.log(tracks);
    res.send(tracks);
  });
});

router.post("/api/lyrics", (req, res) => {
  console.log("ALBUM ARTIST ", req.body.album, req.body.artist);
  Promise.all([
    mxapp.getGeniusLyrics(req.body.track, req.body.artist),
    mxapp.fmAlbumSearch(req.body.album, req.body.artist),
  ]).then((values) => {
    console.log("PROMISE ALL ", values);
    res.send(values);
  });
});

router.post("/api/albums", (req, res) => {
  return mxapp
    .getArtist(req.body.name)
    .then((artist) => {
      mxapp.fmArtistSearch(req.body.name);
      return artist[0].artist.artist_id;
    })
    .then((id) => {
      return mxapp.getAlbums(id).then((albums) => {
        console.log(albums);
        router.get("/api/albums", (req, res) => {
          res.send(albums);
        });
        res.send(albums);
      });
    });
});

router.post("/register", (req,res) => {
  res.send(db.register(req.body.username, req.body.password, req.body.email));
});



module.exports = router;
