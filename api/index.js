const express = require('express');
const puppeteer = require('puppeteer-core');
const chromeLambda = require('chrome-aws-lambda');

const app = express();

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: chromeLambda.args,
      executablePath: await chromeLambda.executablePath,
      headless: chromeLambda.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const content = await page.content();

    await browser.close();

    res.send(content);
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Error rendering page');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
