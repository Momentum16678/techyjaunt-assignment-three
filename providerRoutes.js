const express = require("express");
const router = express.Router();
const Provider = require("./providerModel");

// create a new provider profile
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, skillCategory, gender, address } =
      req.body;

    // check if a provider with this email already exists
    const existing = await Provider.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Profile already exists with this email." });
    }

    const provider = await Provider.create({
      fullName,
      email,
      phoneNumber,
      skillCategory,
      gender,
      address,
    });

    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all providers, with optional skill filter
// example: GET /providers?skill=Plumbing
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.skill) {
      // case-insensitive match on skillCategory
      filter.skillCategory = { $regex: req.query.skill, $options: "i" };
    }

    const providers = await Provider.find(filter);
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single provider by id
router.get("/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update provider details
router.patch("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// verify a provider - only sets isVerified to true
router.patch("/:id/verify", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json({ message: "Provider verified.", provider });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a provider profile
router.delete("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found." });
    }

    res.status(200).json({ message: "Provider deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
