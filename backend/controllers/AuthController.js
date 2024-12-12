const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can login.', success: false });
        }

        // Create and hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Signup error:", err);  // Log error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message // Include error message for debugging
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401)  // Use 401 Unauthorized for authentication failures
                .json({ message: 'Auth failed, email or password is incorrect', success: false });
        }

        // Compare the password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401)  // Use 401 Unauthorized for authentication failures
                .json({ message: 'Auth failed, email or password is incorrect', success: false });
        }

        // Create a JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        });
    } catch (err) {
        console.error("Login error:", err);  // Log error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message // Include error message for debugging
        });
    }
};

module.exports = {
    signup,
    login
};
