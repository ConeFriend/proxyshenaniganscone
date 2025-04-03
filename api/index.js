const express = require('express');
const puppeteer = require('puppeteer-core');
//const chromeLambda = require('chrome-aws-lambda');

const app = express();

app.get('/', async (req, res) => {
  try {
    console.log('Launching Puppeteer...');

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    console.log('Navigating to the page...');
    
    // Go to the page and wait for a specific element or network idle
    await page.goto('https://example.com', {
      waitUntil: 'networkidle0', // wait for no more than 0 network connections for at least 500 ms
    });

    // Optionally wait for a specific element to load (if needed)
    // await page.waitForSelector('selector'); 

    /*const content = await page.content();
    await browser.close();

    console.log('Rendering page content...');
    res.send(content);*/
  } catch (error) {
    console.error('Error rendering page:', error);
    res.status(500).send('Error rendering page: ' + error.message);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
