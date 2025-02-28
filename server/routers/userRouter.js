// const router = require("express").Router();
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, Donations, Requests, BloodBank } = require("../models/models");

// 🔹 User Registration Route (New)
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: "Email or phone number already exists" });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

// Existing Routes
router.get("/", auth, async (req, res) => {
    try {
        console.log("Already here")
        const user = await User.find({ _id: req.user });
        console.log(user);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post("/donate", auth, async (req, res) => {
    try {
        req.body.userId = req.user;
        const date = new Date();
        req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();
        const newDonation = new Donations(req.body);
        const saved = await newDonation.save();
        await BloodBank.updateOne(
            { _id: req.body.bankId },
            { $push: { donations: { _id: saved._id } } }
        );
        res.send("done")
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post("/request", auth, async (req, res) => {
    try {
        req.body.userId = req.user;
        const date = new Date();
        req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString();
        const newRequest = new Requests(req.body);
        const saved = await newRequest.save();
        await BloodBank.updateOne(
            { _id: req.body.bankId },
            { $push: { requests: { _id: saved._id } } }
        );
        res.send("done")
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/donations", auth, async (req, res) => {
    try {
        const data = await Donations.find({ userId: req.user }).populate('bankId', '-_id -__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/requests", auth, async (req, res) => {
    try {
        const data = await Requests.find({ userId: req.user }).populate('bankId', '-_id -__v -password -requests -donations -stock');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.put("/", auth, async (req, res) => {
    try {
        console.log(req.user);
        const result = await User.updateOne({ _id: req.user }, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User updated");
        
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
