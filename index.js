const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
// IIFE
(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto("https://br.investing.com/");

  await page.waitForTimeout(5000);

  await page.screenshot({ path: "screenshot.png" });

  const pageData = await page.evaluate(() => {
    return {
      html: document.documentElement.innerHTML,
    };
  });

  const $ = cheerio.load(pageData.html);
  const element = $(
    "#leftColumn > div.sectionsWrapper > div.homepageWidget.newsAnalysis > div.carousel.carouselNews.js-carousel-news.newsCarouselWrapper > div.hugeTitle.currentArticle.js-current-article > article > div.textDiv > a"
  );
  console.log(element.text());

  await browser.close();
})();
