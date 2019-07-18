const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();
app.use(cors());

const PORT = 4000;
const GOOGLE_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
const DARKSKY_API_KEY = process.env.DARKSKY_WEATHER_API_KEY;
const BASE_GOOGLE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const BASE_DARKSKY_URL = 'https://api.darksky.net/forecast/'

async function getCoordsFromZip(loc) {
    let locationData = await fetch(`${BASE_GOOGLE_URL}${loc}&key=${GOOGLE_API_KEY}`);
    locationData = await locationData.json();
    return locationData;
}

async function getWeatherFromCoords({lat, lng}) {
    let data = await fetch(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}`);
    data = await data.json();
    return data
}

app.get('/api', async (req, res) => {
    const location = req.params.address || 'Astoria';
    let coords = await getCoordsFromZip(location)
    coords = await coords.results[0].geometry.location;
    let weather = await getWeatherFromCoords(coords);
    res.json(weather);
});


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});