// Scryfall API functions
const fetch = (...args) => 
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fs = require("fs");
require("dotenv").config();


const sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const getPlanesData = async function() {
  const URL = "https://api.scryfall.com/cards/search?order=name&q=type%3Aplane+(game%3Apaper)";

  await sleep(100);
  const res = await fetch(URL);
  if (res.status === 200) {
    const setData = await res.json();
    return setData.data;
  } else {
    console.log(`The cards could not be accessed. Error code ${res.status}.`);
    return null;
  }
}


module.exports = {
  sleep: sleep,
  getPlanesData: getPlanesData
};