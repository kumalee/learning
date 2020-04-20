const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const name = 'friends';
const prePath = path.resolve(__dirname, `../${name}`);

const mkdirIfNotExists = path => {
  if (!fs.existsSync(path)) {
    console.log(`create ${path}`);
    fs.mkdirSync(path);
  }
}

const mkFileIfNotExists = (path, data) => {
  fs.appendFile(path, data, (err) => {
    if (err) throw err;
    console.log(`create ${path}`);
  });
}

const saveSeaonInfo = (season, episodes) => {
  const seasonPath = path.resolve(prePath, season);
  mkdirIfNotExists(seasonPath);
  mkFileIfNotExists(path.resolve(seasonPath, 'index.md'), JSON.stringify(episodes, null, '\t'));
}

const getSeasonList = async () => {
  mkdirIfNotExists(prePath);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // go to episode list page
  const url = `https://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=${name}`;
  console.log('open page ', url);
  await page.goto(url);
  console.log('page opened.');
  // go to episode detail page
  const seasons = await page.$$('.season-episodes');
  for (season of seasons) {
    const title = await season.$eval('h3', el => el.innerText);
    const epis = await season.$$eval('.season-episode-title', episodes => episodes.map(episode => ({ 
        etitle: episode.innerText.split(' - '),
        elink: episode.href
      })));
    saveSeaonInfo(title, epis);
  }
  console.log('finished!');
  await browser.close();
};

const main = () => {
    getSeasonList();
}

module.exports = main;