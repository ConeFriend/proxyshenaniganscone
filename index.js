const fetch = require('node-fetch'); // Make sure fetch is available

module.exports = async (req, res) => {
  const { url } = req.query;

  if (url) {
    try {
      // Fetch the content from the provided URL
      const response = await fetch(url);
      
      if (!response.ok) {
        return res.status(500).send('Failed to fetch the URL');
      }

      // Retrieve the content of the URL (e.g., HTML)
      const data = await response.text();

      // Send the content back to the client
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send('Error while fetching the URL');
    }
  } else {
    res.status(400).send('URL query parameter is required');
  }
};
