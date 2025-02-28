const router = require("express").Router();
const auth = require("../middleware/auth");
const { Camp } = require("../models/models");

router.post("/", auth, async (req, res) => {
    try {
        req.body.bankId = req.user;
        req.body.donors = [];
        const newCamp = new Camp(req.body);
        await newCamp.save();
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/:state?/:district?", auth, async (req, res) => {
    try {
        let query = {};
        if (req.params.state && req.params.district) {
            query.state = req.params.state;
            query.district = req.params.district;
        } else if (req.user) {
            query.bankId = req.user;
        } else {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const data = await Camp.find(query).populate('bankId', '-_id -__v -password -requests -donations -stock').populate({
            path: "donors._id",
            select: '-__v -password'
        });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/allCamps/:state/:district/:date", async (req, res) => {
    try {
        if (req.params.date) {
            const startOfDay = new Date(req.params.date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(req.params.date);
            endOfDay.setHours(23, 59, 59, 999);

            const data = await Camp.find({
                state: req.params.state,
                district: req.params.district,
                date: { $gte: startOfDay, $lt: endOfDay }  // ✅ Now matches full day
            }, { donors: 0, _id: 0 }).populate("bankId", "-_id -password -donations -requests -stock +name");
            
            res.json(data);
        } else {
            res.json({});
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});


router.put("/:id/:userId?", auth, async (req, res) => {
    try {
        if (req.params.userId) {
            await Camp.updateOne(
                {
                    _id: req.params.id,
                    donors: { $elemMatch: { _id: req.params.userId, status: 0 } }
                },
                { $set: { "donors.$.units": req.body.units, "donors.$.status": 1 } }
            );
        }
         else {
            const existingDonor = await Camp.findOne({
                _id: req.params.id,
                "donors._id": req.user
            });
            
            if (!existingDonor) {
                await Camp.updateOne(
                    { _id: req.params.id },
                    { $push: { donors: { _id: req.user } } }
                );
            }
            
        }
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;