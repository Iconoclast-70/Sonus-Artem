const express = require("express");
const router = express.Router();
const mxapp = require("../application");
const db = require("../db/database");

// mxapp.discogArtist();
// mxapp.getArtists("Flotsam & Jetsam");
// mxapp.getAlbums(24838410);
// mxapp.getAlbumTracks(10310480);
// mxapp.getTrackLyrics(30203008);

router.post("/api/albums", (req, res) => {
  return mxapp
    .getArtist(req.body.name)
    .then((artist) => {
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

router.get("/login", (req, res) =>
  res.send({
    token: "TokenTest",
  })
);

module.exports = router;
