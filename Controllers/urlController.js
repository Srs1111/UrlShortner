const Url = require("../models/urlModel");

const { nanoid } = require("nanoid");

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const shortCode = nanoid(6);
  const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

  await Url.create({ shortCode, originalUrl });
  res.json({ shortUrl });
};

const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  const urlDoc = await Url.findOne({ shortCode });

  if (urlDoc) return res.redirect(urlDoc.originalUrl);
  res.status(404).json({ error: "URL not found" });
};

module.exports = { shortenUrl, redirectUrl };
