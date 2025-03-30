import puppeteer from 'puppeteer-core';
//test
 
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    // Log the URL for debugging
    console.log("Rendering URL with Puppeteer:", url);

    // Launch Puppeteer to render the page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get the fully rendered HTML
    const data = await page.content();
    await browser.close();

    // Set the correct headers for HTML content
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(data);
  } catch (error) {
    console.error("Error rendering the URL:", error);
    res.status(500).send("Error rendering the URL");
  }
}
