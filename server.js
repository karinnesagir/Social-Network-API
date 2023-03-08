const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

// Connection string to local instance of Mongoose
const connectionStringURI = `mongodb://localhost/social-network-api`;

// Create a connection to Mongoose
mongoose.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

app.listen(PORT, () => console.log(` *** Connected on localhost:${PORT} *** `));