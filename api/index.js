const express = require('express');
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda'); // This will manage the correct Chromium version

const app = express();

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Error: Missing "url" query parameter');
    }

    try {
        // Launch Chromium using chrome-aws-lambda
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: await chromium.executablePath, // Path to the Chromium binary for serverless
            args: chromium.args, // Arguments to make Chromium work in serverless environments
            defaultViewport: chromium.defaultViewport, // Default viewport size
            ignoreHTTPSErrors: true, // Ignore SSL errors
        });

        // Create a new page
        const page = await browser.newPage();

        // Navigate to the requested URL
        await page.goto(url, {
            waitUntil: 'domcontentloaded', // Wait for the page to load
        });

        // Get the HTML content of the page
        const content = await page.content();

        // Close the browser after rendering
        await browser.close();

        // Send the HTML content as the response
        res.send(content);
    } catch (err) {
        res.status(500).send(`Error rendering page: ${err.message}`);
    }
});

module.exports = app;
