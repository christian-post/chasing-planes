const express = require('express');
require("dotenv").config();
const path = require('path');

const { getPlanesData, getPhenomenaData } = require('./scryfall');

const app = express()
  // .use('/static', express.static(path.join(__dirname, '../public')))
  .use(express.static('public'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
 


// GET requests
app.get('/', async function(req, res) {
  const planes = await getPlanesData();
  const phenomena = await getPhenomenaData();

  const params = {
    planes: planes,
    phenomena: phenomena
  };

  res.render('pages/index', params);
});


function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


app.get('/planes', async function(req, res) {
  const planes = await getPlanesData();
  const phenomena = await getPhenomenaData();

  shuffle(planes)
  
  res.render('pages/planes', {
    planes: planes.slice(0, 40),
    phenomena: phenomena
  });
});


app.post('/planes', async function(req, res) {
  const planes = await getPlanesData();
  const phenomena = await getPhenomenaData();

  console.log(req.body)
  
  res.render('pages/planes', {
    planes: planes,
    phenomena: phenomena
  });
});





// server loop

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});