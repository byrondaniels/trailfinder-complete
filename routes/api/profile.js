const express = require('express');
const request = require('request');
const config = require('config');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Posts');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    '/',
    [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            blog,
            location,
            bio,
            externalImg,
            status,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (blog) profileFields.blog = blog;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (externalImg) profileFields.externalImg = externalImg;
        if (status) profileFields.status = status;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = "https://www.youtube.com/" + youtube;
        if (twitter) profileFields.social.twitter = "https://www.twitter.com/" + twitter;
        if (facebook) profileFields.social.facebook = "https://www.facebook.com/" + facebook;
        if (linkedin) profileFields.social.linkedin = "https://www.linkedin.com/" + linkedin;
        if (instagram) profileFields.social.instagram = "https://www.instagram.com/" + instagram;

        if (externalImg) {
            try {
                const updatedUser = {}
                updatedUser.avatar = externalImg
                await User.findOneAndUpdate(
                    { _id: req.user.id },
                    { $set: updatedUser },
                    { new: true }
                );

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }


        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        await Post.deleteMany({ user: req.user.id });
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/profile/hikes
// @desc     Add profile hikes
// @access   Private
router.put('/hikes',
    [auth, [
        check('name', 'Title is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('fromDate', 'From date is required').not().isEmpty(),
        check('status', 'Status is required').not().isEmpty()
    ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            length,
            location,
            fromDate,
            toDate,
            description,
            status
        } = req.body;

        const newExp = {
            name,
            length,
            location,
            fromDate,
            toDate,
            description,
            status
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.hikes.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    PUT api/profile/hikes
// @desc     Add profile hikes
// @access   Private
router.put('/APIhikes',
    [auth, [
        check('hikeData', 'Missing hike data').not().isEmpty(),
    ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            hikeData,
        } = req.body;

        const newHike = {
            hikeData,
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            console.log("profile", profile)
            profile.hikingprojecttrails.unshift(newHike);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/profile/hikes/:hike_id
// @desc     Delete hikes from profile
// @access   Private
router.delete('/hikes/:hike_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        const expIds = foundProfile.hikes.map(exp => exp._id.toString());
        // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /hikes/5
        const removeIndex = expIds.indexOf(req.params.hike_id);
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
        } else {
            foundProfile.hikes.splice(removeIndex, 1);
            await foundProfile.save();
            return res.status(200).json(foundProfile);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});

// @route    PUT api/profile/courses
// @desc     Add profile course
// @access   Private
router.put(
    '/courses',
    [
        auth,
        [
            check('authority', 'Authority is required').not().isEmpty(),
            check('name', 'Course name is required').not().isEmpty(),
            check('category', 'Category is required').not().isEmpty(),
            check('completedDate', 'Completed Date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            authority,
            name,
            category,
            completedDate,
            description
        } = req.body;

        const newCourse = {
            authority,
            name,
            category,
            completedDate,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.courses.unshift(newCourse);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


router.delete("/courses/:course_id", auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        const courseIds = foundProfile.courses.map(item => item._id.toString());
        // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /course/5
        const removeIndex = courseIds.indexOf(req.params.course_id);
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
        } else {

            foundProfile.courses.splice(
                removeIndex,
                1,
            );
            await foundProfile.save();
            return res.status(200).json(foundProfile);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
});`


// @route    GET api/profile/hiking-project/:lat/:long/:distance
// @desc     Get trails from hiking project api using coordonates
// @access   Private
// router.get('/hiking-project/:lat/:long/:distance',auth, (req, res) => {




// })

// @route    GET api/profile/unsplash/:subject
// @desc     Get random images from Unsplash
// @access   Private
router.get('/unsplash/:subject', auth, (req, res) => {
    try {
        const unsplash = new Unsplash({
            applicationId: `${config.get('unsplashAccessKey')}`,
            secret: `${config.get('unsplashSecret')}`
        });
        unsplash.photos.getRandomPhoto({ count: "4", width: 100, height: 100, featured: true, query: req.params.subject })
            .then(toJson)
            .then(json => {
                const resp = json.map(item => { return item.urls })
                return res.status(200).json(resp);
            });


    } catch (err) {
        console.error("aa", err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;