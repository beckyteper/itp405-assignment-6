var express = require('express');
var app = express();
var mysql = require('mysql');

app.get('/api/dvds/:id', function(request, response) {
  var connection = mysql.createConnection({
    host     : 'itp460.usc.edu',
    user     : 'student',
    password : 'ttrojan',
    database : 'dvd'
  });

  var dvdID = request.params.id;

  connection.query('SELECT dvds.title, dvds.award, dvds.genre_id, genres.genre_name, dvds.rating_id, ratings.rating_name FROM dvds, genres, ratings WHERE dvds.genre_id = genres.id and dvds.rating_id = ratings.id and dvds.id = ?', [ dvdID ], function(error, dvds) {
  if (error) {
    throw error;
  };

  var formattedDVDs = dvds.map(function(dvd) {
    return {
      title: dvd.title,
      award: dvd.award,
      genre: {
        id: dvd.genre_id,
        genre_name: dvd.genre_name
      },
      rating: {
        id: dvd.rating_id,
        rating_name: dvd.rating_name
      }
    };
  });

  response.json(formattedDVDs[0]);
  connection.end();
  });
});

app.listen(3000);
