require("dotenv").config();
const express = require("express");
const os = require("os");
const cluster = require("cluster");
const auth = require("./src/routes/auth-routes");
const DATABASE_CONNECTION = require("./src/database/Database");
const numCPU = os.cpus().length;
const PORT = process.env.PORT || 8000;
const host = "localhost";
const app = express();
const pug = require("pug");
const path = require("path");

// PATHS
const TEMPLATE_ENGINE = path.join(__dirname, "/src/views");

// MIDDLEWARES
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.set("view engine", "pug");
app.set("views", TEMPLATE_ENGINE);
app.use(express.static("src/public"));
// HANDLED ROUTSES

// UNHANDLED ROUTES
app.use("/auth/api/v1", auth);
app.get("/", (req, res) => {
  res.render("Welcome");
});
app.all("*", (req, res, next) => {
  res.status(404).json({ error: `This Route (${req.originalUrl}) not found` });
});
const DB_URL = process.env.DATABASEURL;
DATABASE_CONNECTION(DB_URL);
if (cluster.isPrimary) {
  for (let i = 0; i <= numCPU; i++) {
    cluster.fork();
  }
} else {
  app.listen(PORT, () =>
    console.log(
      `Your server is runing on port http://${host}:${PORT} with pid:${process.pid}`
    )
  );
}
