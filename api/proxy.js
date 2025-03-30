const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  try {
    console.log("Rendering URL with Puppeteer:", req.query.url);
    
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: true
    });

    const page = await browser.newPage();
    await page.goto(req.query.url);

    const content = await page.content();
    await browser.close();

    res.status(200).send(content);  // Send the rendered content back
  } catch (error) {
    console.error("Error rendering the URL:", error);
    res.status(500).send("Error rendering the URL");
  }
};
