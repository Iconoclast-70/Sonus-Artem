const express = require("express");
const router = express.Router();
const mxapp = require("../application");
const db = require("../db/database");

// mxapp.discogArtist();

router.post("/api/tracks", (req, res) => {
  return mxapp.getAlbumTracks(req.body.id).then((tracks) => {
    console.log(tracks);
    res.send(tracks);
  });
});

// router.post("/api/lyrics", (req, res) => {
//   console.log("TRACK ID ", req.body.id);
//   return mxapp.getTrackLyrics(req.body.id).then((lyrics) => {
//     console.log(lyrics);
//     res.send(lyrics);
//   });
// });

router.post("/api/lyrics", (req, res) => {
  console.log("TRACK ID ", req.body.track, req.body.artist);
  return mxapp
    .getGeniusLyrics(req.body.track, req.body.artist)
    .then((lyrics) => {
      console.log(lyrics);
      res.send(lyrics);
    });
});

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
