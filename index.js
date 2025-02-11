module.exports = async (req, res) => {
    const { url } = req.query;
    
    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.text();
        
        res.status(200).send(data); // Send the response back to the client
      } catch (error) {
        res.status(500).send('Error while fetching the URL');
      }
    } else {
      res.status(400).send('URL query parameter is required');
    }
};
  