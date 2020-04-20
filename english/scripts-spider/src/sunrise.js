const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const name = 'sunrise';
const download = require('download');
const prePath = path.resolve(__dirname, `../${name}`);

const sleep = time => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

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

const saveNews = (tax, news) => {
  const taxPath = path.resolve(prePath, tax);
  mkdirIfNotExists(taxPath);
  mkFileIfNotExists(path.resolve(taxPath, 'index.md'), JSON.stringify(news, null, '\t'));
}

const getNews = async (targets) => {
  mkdirIfNotExists(prePath);
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  // go to episode list page
  for (target of targets) {
    const url = target.url;
    console.log('open page ', url);
    await page.goto(url);
    console.log('page opened.');
    // go to episode detail page
    const newsboxs = await page.$$('.newsbox');
    const newslist = [];
    for (news of newsboxs) {
        let singleNews = {};
        const titleAndLink = (await news.$eval('a', el => el.innerText + '|' + el.href)).split('|');
        singleNews.title = titleAndLink[0];
        singleNews.link = titleAndLink[1];
        const date = await news.$eval('.span-3', el => el.innerText);
        singleNews.date = date.replace(/\,/g, '-');
        newslist.push(singleNews);
    }
    if (target.pages.length) {
        for (thepage of target.pages) {
            const nextUrl = `${target.url}-${thepage}.html`;
            console.log('open page ', nextUrl);
            await page.goto(nextUrl);
            console.log('page opened.');
            // go to episode detail page
            const nextNewsboxs = await page.$$('.newsbox');
            for (news of nextNewsboxs) {
                let singleNews = {};
                const titleAndLink = (await news.$eval('a', el => el.innerText + '|' + el.href)).split('|');
                singleNews.title = titleAndLink[0];
                singleNews.link = titleAndLink[1];
                const date = await news.$eval('.span-3', el => el.innerText);
                singleNews.date = date.replace(/\./g, '-');
                newslist.push(singleNews);
            }
        }
    }
    saveNews(target.tax, newslist);
  }
  console.log('finished!');
  await browser.close();
};

const formatContent = (content, date) => {
    let [year, month] = date.split('-');
    let tempContent = content
        .replace(/\&nbsp\;/g, '')
        .replace(/\s+class\=\".*?"/g, '')
        .replace(/\s+style\=\".*?\"/g, '')
        .replace(/\s+align\=\".*?\"/g, '')
        .replace(/\<(span|big).*?\>/g, '')
        .replace(/\<\/(span|big).*?\>/g, '')
        .replace(/width\=\".*?\"/g, '')
        .replace(/height\=\".*?\"/g, '')
        .replace(/src\=\"\/admins\/uploadfile/g, `class="aligncenter" src="http://suntest.webtecher.cn/wp-content/uploads/${year}/${month}`);
    return tempContent;
}

const saveContent = (dir, fileName, content) => {
    const dirName = path.resolve(prePath, dir, fileName);
    mkdirIfNotExists(dirName);
    const file = `${dirName}/content.html`;
    mkFileIfNotExists(file, content);
}

const getContent = async () => {
    const dirs = fs.readdirSync(prePath);
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    for( dir of dirs) {
        const list = JSON.parse(fs.readFileSync(`${prePath}/${dir}/index.md`));
        for (let i = 0; i< list.length; i++) {
            const entity = list[i];
            console.log('open page ', entity.title, entity.link);
            await page.goto(entity.link);
            console.log('page opened.');
            let content = await page.$eval('.content', el => el.innerHTML);
            content = formatContent(content, entity.date);
            saveContent(dir, `${dir}-${i}`, content);
            let imgs = await page.$$eval('.content img', els => els.map(el => el.src));
            for (img of imgs) {
                console.log(`download ${img}`);
                await download(img, path.resolve(prePath, dir, `${dir}-${i}`));
                await sleep(1000);
            }
            // await page.screenshot({
            //     fullPage: true,
            //     path: path.resolve(__dirname, '../sunrise-screenshots', `${dir}-${idx}.png`)
            // });
            await sleep(600);
        }
    }
    console.log('finished!');
    await browser.close();
}

const main = async () => {
    const targets = [{
        tax: 'company',
        url: 'http://sunrisepak.cn/newslist/',
        pages: [2,3,4,5]
    }, {
        tax: 'industry',
        url: 'http://sunrisepak.cn/newslist/hylist.html',
        pages: []
    },{
        tax: 'product',
        url: 'http://sunrisepak.cn/newslist/cplist.html',
        pages: []
    },{
        tax: 'knowledge',
        url: 'http://sunrisepak.cn/newslist/bklist.html',
        pages: []
    }];
    await getNews(targets);
}

module.exports = {
    getList: main,
    getContent
}