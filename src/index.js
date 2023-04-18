const express = require('express');
require("dotenv").config();
const path = require('path');

const { getPlanesData } = require('./scryfall');

const app = express()
  // .use('/static', express.static(path.join(__dirname, '../public')))
  .use(express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
 


// GET requests
app.get('/', async function(req, res) {
  const cards = await getPlanesData();

  const params = {
    cards: cards
  };

  res.render('pages/index', params);
});


// server loop

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});