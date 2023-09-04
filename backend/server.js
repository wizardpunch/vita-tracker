//import tools
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//set PORT to 3000
require('dotenv').config();
const PORT = process.env.PORT

//sets app as express.js
const app = express();

app.use(cors());
app.use(express.json());

//connects to mongoDB database
const link = process.env.MONGO_DB;
mongoose.connect(link, { useNewUrlParser: true, useUnifiedTopology: true }
);

//tests connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connected");
})

//sets CRUD routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
})