const express = require('express');
const puppeteer = require('puppeteer-core');
const chromeLambda = require('chrome-aws-lambda');

const app = express();

app.get('/', async (req, res) => {
  try {
    console.log('Launching Puppeteer...');

    // Launching Puppeteer with chrome-aws-lambda
    const browser = await puppeteer.launch({
      args: chromeLambda.args,
      executablePath: await chromeLambda.executablePath,
      headless: chromeLambda.headless,
    });

    const page = await browser.newPage();
    console.log('Navigating to the page...');
    await page.goto('https://example.com');
    const content = await page.content();

    await browser.close();

    console.log('Rendering page content...');
    res.send(content);
  } catch (error) {
    console.error('Error rendering page:', error);  // Detailed logging
    res.status(500).send('Error rendering page: ' + error.message);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
