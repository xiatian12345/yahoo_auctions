const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const config = require('./config');
let globalBrowser = null;

const launch = (isShow = true) => {
    return new Promise(async (resolve) => {
        let browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
            dumpio: false,
            headless: isShow ? !isShow : !config.isShow,
            executablePath: config.chromePath,
            timeout: 0,
            userDataDir: './userdata'
        });
        globalBrowser = browser;
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        await page.setViewport({
            width: 1024,
            height: 768,
        });
        await page.setViewport({ width: 0, height: 0 });
        resolve(page);
    });
}

(async () => {
    const listAddress = 'https://jp.mercari.com/mypage/purchases';
    let page = await launch(true).catch();
    await page.goto(listAddress, { waitUntil: "networkidle0" }).catch(() => { });
})();