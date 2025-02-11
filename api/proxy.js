export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL query parameter is required");
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
