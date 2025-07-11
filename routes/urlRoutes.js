const express = require("express");
const { nanoid } = require("nanoid");

const router = express.Router();

const Url = require("../models/urlModel");
const isValidUrl = require("../utils/isvalidurl");

const { shortenUrl, redirectUrl } = require("../Controllers/urlController");

//Post method create new shorten Url
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || !isValidUrl(originalUrl)) {
      return res.status(400).json({ error: "Invalid or missing URL" });
    }
    // Checking is alredy shorted or not
    const exisiting = await Url.findOne({ originalUrl });
    if (exisiting) {
      return res.status(200).json({ shortenUrl: exisiting.shortenUrl });
    }

    // generate new shortcode using nanoid
    const shortCode = nanoid(6);
    const shortenUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    //expire Limit 24 hours from now

    const expireAt = new Date(Date.now() + 24 * 60 * 1000);

    //save to Database

    const newUrl = new Url({ originalUrl, shortCode, expireAt });
    await newUrl.save();

    res.status(201).json({ shortenUrl, expireAt });
  } catch (err) {
    console.error("Error in POST /shorten:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//Get Method redirect to original Url

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const found = await Url.findOne({ shortCode });

    if (!found) {
      return res.status(404).json({ error: "Short Url not found" });
    }

    if (found.expireAt && found.expireAt < new Date()) {
      return res.status(410).json({ error: "This URL expired" });
    }
    res.redirect(found.originalUrl);
  } catch (err) {
    console.error("Error in GET /:shortCode", err.message);
    res.status(500).json({ err: "Server Error" });
  }
});

//Update the Url By Shortcode

router.put("/update/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ erro: "Invalid or missing new URL" });
    }
    const updated = await Url.findOneAndUpdate(
      { shortCode },
      { originalUrl },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Short code not found" });
    }
    res.status(200).json({ message: "URL updated successfully", updated });
  } catch (err) {
    console.error("Error in PUT /updated/:shortCode:", err.messgae);
    res.status(500).json({ error: "Server Error" });
  }
});

//Delete  the URL by Shortcode
router.delete("/delete/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "Short URl not found" });
    }
    res.status(200).json({ message: "URL deleted successfully", deleted });
  } catch (err) {
    console.error("Error in DELETE /delete/:shortCode:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
