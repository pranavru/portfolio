//You should not include .env file in production -  Advised in documentation

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const mongooseConnection = mongoose.connection;
console.log(config.get("dbConnectionString"))
mongoose.connect(config.get("dbConnectionString"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongooseConnection.on("connected", () => {
  console.log("Server has established a mongoose connection")
});
mongooseConnection.on("error", (error) => {
  console.log(error);
})

const { PORT, ENTRY_URL } = process.env;

const app = express();

const options = { extended: true, type: ['text/html', 'text/plain', 'application/json', 'application/*+json', 'application/*', 'application/graphql', 'application/x-www-form-urlencoded'] }
app.use(bodyParser.urlencoded(options))
app.use(bodyParser.json());
app.use(cors());

const port = PORT || 3000;
const userSchema = require('./routes/Users/userSchema');

app.use(ENTRY_URL + '/user', graphqlHTTP({ schema: userSchema, pretty: true, graphiql: true }));

app.listen(port, () => {
  console.log(`Server has started listening on port number ${port}, ${ENTRY_URL}`);
});