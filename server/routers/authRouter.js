// const router = require("express").Router();
// const { User, BloodBank } = require("../models/models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // register

// router.post("/:handle", async (req, res) => {
//     try {
//         // validation
//         const handle = req.params.handle;
//         const existingUser = handle == "bank" ?
//             await BloodBank.findOne({ phone: req.body.phone }) :
//             await User.findOne({ phone: req.body.phone });
//         if (existingUser)
//             return res.status(400).json({
//                 errorMessage: "An account with this email already exists.",
//             });

//         // hash the password

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(req.body.password, salt);
//         req.body.password = passwordHash;
//         // save a new user account to the db

//         const newUser = handle == "bank" ? new BloodBank(req.body) : new User(req.body);
//         const savedUser = await newUser.save();

//         // sign the token
//         const token = jwt.sign({ user: savedUser._id, type: handle }, process.env.JWT_SECRET);

//         // send the token in a HTTP-only cookie

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         }).send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });

// // log in

// router.post("/login/:handle", async (req, res) => {
//     try {
//         const { phone, password } = req.body;
//         const handle = req.params.handle;
//         const existingUser = await (handle == "bank" ? BloodBank.findOne({ phone: phone }) : User.findOne({ phone: phone }));
//         console.log(existingUser);
//         if (!existingUser)
//             return res.status(401).json({ errorMessage: "Wrong username or password." });
//         const passwordCorrect = await bcrypt.compare(
//             password,
//             existingUser.password
//         );

//         if (!passwordCorrect)
//             return res.status(401).json({ errorMessage: "Wrong username or password." });

//         // sign the token

//         const token = jwt.sign(
//             {
//                 user: existingUser._id,
//                 type: handle
//             },
//             process.env.JWT_SECRET
//         );

//         // send the token in a HTTP-only cookie

//         res
//             .cookie("token", token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none",
//             })
//             .send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });

// router.get("/logout", (req, res) => {
//     res
//         .cookie("token", "", {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         })
//         .send();
//     console.log("Logged Out")
// });

// router.get("/loggedIn", async (req, res) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.json({ auth: false });
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await (verified.type == "bank" ? BloodBank : User).findOne({ _id: verified.user }, { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 });
//         console.log("logged in")
//         res.send({ auth: true, user: user });
//     } catch (err) {
//         console.log(err);
//         res.json({ auth: false });
//     }
// });

// module.exports = router;
const router = require("express").Router();
const { User, BloodBank } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register
router.post("/:handle", async (req, res) => {
    try {
        const handle = req.params.handle;
        const { phone, password } = req.body;

        // ✅ Ensure password is provided
        if (!password) {
            return res.status(400).json({ errorMessage: "Password is required." });
        }

        // ✅ Ensure password is a string
        if (typeof password !== "string") {
            return res.status(400).json({ errorMessage: "Invalid password format." });
        }

        // Check if user already exists
        const existingUser = handle == "bank" ?
            await BloodBank.findOne({ phone }) :
            await User.findOne({ phone });

        if (existingUser)
            return res.status(400).json({ errorMessage: "An account with this phone number already exists." });

        // ✅ Hash the password properly
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        req.body.password = passwordHash;

        // Save new user
        const newUser = handle == "bank" ? new BloodBank(req.body) : new User(req.body);
        const savedUser = await newUser.save();

        // Sign token
        const token = jwt.sign({ user: savedUser._id, type: handle }, process.env.JWT_SECRET);

        // Send token in HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});


// Log in
router.post("/login/:handle", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const handle = req.params.handle;
        const existingUser = await (handle == "bank" ? BloodBank : User).findOne({ phone });

        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong phone number or password." });

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong phone number or password." });

        // Sign token
        const token = jwt.sign({ user: existingUser._id, type: handle }, process.env.JWT_SECRET);

        // Send token in HTTP-only cookie
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// Log out
router.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, secure: true, sameSite: "none" }).send();
    console.log("Logged Out");
});

// Check if logged in
router.get("/loggedIn", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json({ auth: false });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await (verified.type == "bank" ? BloodBank : User)
            .findOne({ _id: verified.user }, { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 });

        res.send({ auth: true, user });
    } catch (err) {
        console.log(err);
        res.json({ auth: false });
    }
});

// Forgot Password (Generate Reset Token & Send Email)
router.post("/forgot-password/:handle", async (req, res) => {
    try {
        const { phone } = req.body;
        const handle = req.params.handle;
        
        // Find user by phone
        const user = await (handle === "bank" ? BloodBank : User).findOne({ phone });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
        await user.save();

        // Send reset email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link below:
            ${process.env.CLIENT_URL}/reset-password/${handle}/${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Password reset link sent to email" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Reset Password (Verify Token & Update Password)
router.post("/reset-password/:handle/:token", async (req, res) => {
    try {
        const { handle, token } = req.params;
        const { password } = req.body;

        // Find user by reset token
        const user = await (handle === "bank" ? BloodBank : User).findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Check if token is still valid
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        // Hash new password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
