const cors = require('cors');
const cheerio = require('cheerio');
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const fetchUrl = 'https://www.northeastraces.com/';

const removeLocationText = location => location.replace('location:', '');

const formatDistance = (distance) => {
  const formattedDistance = distance.split(',');

  return formattedDistance.map(d => d.trim());
};

const getData = async (url) => {
  const data = [];

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const raceWrapper = $('.rtr > div');

    raceWrapper.map(function formatData() {
      const title = $(this)
        .find('.qzr')
        .text();

      const location = $(this)
        .find('.qzl')
        .text();

      const year = $(this)
        .find('.qz15')
        .first()
        .text();

      const month = $(this)
        .find('.qzd')
        .text()
        .slice(0, 3);

      const day = $(this)
        .find('.qzd')
        .text()
        .slice(4, 6);

      const getTime = $(this)
        .find('.qz48')
        .text();

      const time = `${getTime.slice(0, 2)}:${getTime.slice(2, 4)}`;

      const date = `${year}-${month}-${day}`;

      const postcode = removeLocationText(
        $(this)
          .find('.qz15')
          .eq(2)
          .text(),
      );

      const raceUrl = $(this)
        .find('.mlde')
        .find('.nw')
        .eq(3)
        .parent()
        .attr('href');

      const distance = formatDistance(
        $(this)
          .contents()
          .eq(11)
          .text(),
      );

      data.push({
        title,
        location,
        postcode,
        date,
        time,
        raceUrl,
        distance,
      });

      return data;
    });
  } catch (err) {
    return new Error('Unable to get data');
  }

  return data;
};

app.get('/data', async (req, res) => {
  const response = await getData(fetchUrl);
  const data = await response;

  res.json(data);
});

app.listen(port);
