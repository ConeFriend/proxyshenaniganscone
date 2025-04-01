const express = require('express');
const puppeteer = require('puppeteer'); // We'll keep this for later use

const app = express();

app.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Error: Missing "url" query parameter');
    }

    // Here, we're just returning the HTML content as text for now
    try {
        res.send(`
            <html>
                <head>
                    <title>Proxy</title>
                </head>
                <body>
                    <h1>Rendering URL: ${url}</h1>
                    <p>The content will be displayed here later.</p>
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send(`Error rendering page: ${err.message}`);
    }
});

module.exports = app;
