const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const geocode = require('./utils.js/geocode');
const forecast = require('./utils.js/forecast');
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mayur Mohurle',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Mayur Mohurle',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is help message',
    title: 'Help',
    name: 'Mayur Mohurle',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide a Address',
    });
  } else {
    geocode(address, (error, { latitude, longitute, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitute, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    msg: 'Help article not found',
    title: '404',
    name: 'Mayur Mohurle',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    msg: 'Page not found',
    title: '404',
    name: 'Mayur Mohurle',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
