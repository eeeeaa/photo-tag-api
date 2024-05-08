const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const playerRouter = require("./routes/players");
const charImageRouter = require("./routes/charImages");

const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const allowOrigins = process.env.ORIGINS.split(",");

app.use(
  cors({
    origin: allowOrigins,
  })
);

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.ATLAS_URI || "";
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(connectionString);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//use compression to reduce time to transfer data between client/server
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

//use helmet to protect against well-known web vulnerabilities
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use("/", indexRouter);
app.use("/players", playerRouter);
app.use("/char-images", charImageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error information
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
