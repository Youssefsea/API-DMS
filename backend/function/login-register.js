const data = require('../DB/Data');
const bcrypt = require('bcryptjs');
const GenTocken = require('../middelware/Gen-JWT');

const registere = async (req, res) => {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const oldUserEmail = await data.User.findOne({ email });

    if (oldUserEmail) {
        return res.status(400).json({ message: 'email already exists' });
    } else {
        try {
            const newUser = new data.User({
                username,
                email,
                password: hashPassword
            });

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const User = await data.User.findOne({ email });
    if (!User) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = await GenTocken({ id: User._id, role: User.role });

    res.status(200).json({
        message: 'Login successful',
        token: token
    });
};

module.exports = { registere, login };
