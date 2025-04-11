// /api/proxy.js
export default async function handler(req, res) {
  const url = "https://www.fnfmodsworld.com/vs-shaggy"; // change to the obscure host
  const response = await fetch(url);
  const text = await response.text();
  
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(text);
}
