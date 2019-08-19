const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Shared = require('../../models/Shared');
const User = require('../../models/User');


// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post('/',
    [auth,
        [check('text', 'Text is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Shared({
                text: req.body.text,
                userName: user.name,
                avatar: user.avatar,
                hikeName: req.body.name,
                hikeUrl: req.body.url,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json(post);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Shared.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Shared.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Shared post not found' });
        }

        res.json(post);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Shared post not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Shared.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Shared post not found' });
        }
        // Check user is matched up to post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Shared post removed' });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Shared post not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Shared.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Shared post already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Shared.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Shared post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:id',
    [auth,
        [check('text', 'Text is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Shared.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Shared.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );

        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = post.comments
            .map(comment => comment.id)
            .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;