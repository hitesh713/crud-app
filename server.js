const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const createHttpError = require('http-errors');
const session = require('express-session');
const flash = require('connect-flash');
const path = require("path");

// mongoDB Connection File require
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// load assets
app.use("/assets", express.static("assets"));


// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    }
  })
);

// Connect Flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('./server/routes/router'));
app.use('/add_user', require('./server/routes/router'));
app.use('/update_user', require('./server/routes/router'));
app.use('/about', require('./server/routes/router'));


///--- error handling using http-errors ---////
// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error404', { error });
});
///--- /error handling using http-errors ---////


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});