const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=1c7a46ad46eebcdcab2f1b03e1627a2e&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.error) {
      callback('Unable to find location , try another search', undefined);
    } else {
      let log =
        body.current.weather_descriptions[0] +
        '. It is currently ' +
        body.current.temperature +
        ' degress out. It feels like ' +
        body.current.feelslike +
        ' degress out';
      callback(undefined, log);
    }
  });
};

module.exports = forecast;
