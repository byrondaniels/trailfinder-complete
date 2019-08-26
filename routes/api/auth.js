const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')


// @route    GET api/auth
// @desc     Load a user after they have either logged in or registered
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

// @route    POST api/auth
// @desc     Login a user
// @access   Public
router.post('/',
    [
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array })
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })
            if (!user) res.status(400).json({ errors: [{ msg: 'Invalid Credentials1' }] });

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) res.status(400).json({ errors: [{ msg: 'Invalid Credentials2' }] });

            const payload = { user: { id: user.id } }
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    })

module.exports = router