//Install express server
const express = require('express');
compression = require('compression');
const app = express();
const path = require('path');
cors = require('cors');
app.use(compression());
app.use(cors());
app.options('*', cors());

// Server only the static files from the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// Path Location Strategy
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
