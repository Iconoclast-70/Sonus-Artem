const Express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const App = Express();
const cors = require("cors");
const PORT = 8080;

// Express Configuration
App.use(cors());
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(Express.static("public"));
App.use(apiRoutes);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT} 🤘`);
});
