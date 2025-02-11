const fetch = require("node-fetch");

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send("URL query parameter is required");
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0", // Prevent sites from blocking fetch requests
            },
        });

        if (!response.ok) {
            return res.status(500).send("Failed to fetch the URL");
        }

        // Fetch the content of the requested URL
        const data = await response.text();

        // Set content type so the browser renders it properly
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Error while fetching the URL");
    }
};
