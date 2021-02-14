const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
var async = require('async');
var fs = require('fs');
var pg = require('pg');

const app = express();

var config = {
  user: 'root',
  host: 'localhost',
  database: 'hackthrob',
  port: 26257,
};

var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
  // Close communication with the database and exit.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  async.waterfall(
    [
      function (results, next) {
        // Print out account balances.
        client.query('SELECT * FROM users;', next);
      },
    ],
    function (err, results) {
      if (err) {
        console.error(
          'Error inserting into and selecting from accounts: ',
          err
        );
        finish();
      }

      console.log('Initial balances:');
      results.rows.forEach(function (row) {
        console.log(row);
      });

      finish();
    }
  );
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login.html', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.get('/signup.html', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.listen(3000, function () {
  console.log('Server started on 3000.');
});
