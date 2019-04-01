const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const name = 'friends';

const mkdirIfNotExists = path => {
    if (!fs.existsSync(path)) {
        console.log(`create ${path}`);
        fs.mkdirSync(path);
    }
}

const getSeasonDetailLink = el => {
    
}

const getSeasonList = async () => {
  const prePath = path.resolve(__dirname, `../${name}`);
  mkdirIfNotExists(prePath);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // go to episode list page
  await page.goto(`https://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=${name}`);
  // go to episode detail page
  const seasons = await page.$$eval('.season-episodes > h3', seasons => {
    return seasons.map(season => {
      return season.innerHTML;
    });
  });
  seasons.forEach(season => {
    mkdirIfNotExists(path.resolve(prePath, season));
  });
//   const scriptContent = await page.$('.scrolling-script-container');
//   await fs.createWriteStream(`./scripts/${name}`, scriptContent.html().replace(/\<br \/\>/g, '\r\n'));
  await browser.close();
};

const main = () => {
    getSeasonList();
}

main();
