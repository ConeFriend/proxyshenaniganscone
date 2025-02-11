export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    // Log the URL for debugging
    console.log("Fetching URL:", url);

    // Fetch the URL with headers to avoid potential blocking
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    if (!response.ok) {
      return res.status(500).send("Failed to fetch the URL");
    }

    const data = await response.text();
    
    // Set CORS header to allow any origin
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send back the data
    res.status(200).send(data);
  } catch (error) {
    console.error("Error fetching the URL:", error);
    res.status(500).send("Error fetching the URL");
  }
}
