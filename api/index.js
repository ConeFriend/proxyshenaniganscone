const express = require('express');
const puppeteer = require('puppeteer'); // Puppeteer will be used to render the page

const app = express();

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Error: Missing "url" query parameter');
    }

    try {
        // Launch a new headless browser instance
        const browser = await puppeteer.launch({
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessary for serverless environments
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
