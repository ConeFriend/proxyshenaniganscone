const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send("Missing 'url' parameter.");
    }

    let browser = null;

    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();

        res.setHeader('Content-Type', 'text/html');
        res.send(content);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error loading page.");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};
