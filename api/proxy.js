export default async function handler(req, res) {
  let { url } = req.query;

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  // Auto-add 'https://' if missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return res.status(500).send("Failed to fetch the URL");
    }

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error fetching the URL");
  }
}

