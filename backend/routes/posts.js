const router = require('express').Router();
const Post=require('../models/Post')


//create post
router.post('/create', async (req,res) => {
    const newPost = Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).send(post);
    } catch (err) { 
        res.status(500).send(err.message);
    }
})

//update post
router.put('/:id', async (req, res) => { 
    
    try {
        const post = await Post.findById(req.params.id);
        await Post.updateOne({ ...req.body });
        res.status(200).json("Post updated successfully");
    } catch (err) {
            res.status(500).json(err.message);
    }
})

//delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post Deleted successfully");
        } else {
            res.status(404).json("You Cannot Delete Others Post");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//like post
router.put('/:id/like', async (req, res) => {
    try {
        const post =await Post.findById(req.params.id);
        console.log(post.desc);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push :{likes: req.body.userId }});
            res.status(200).json("like");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("dislike");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
 })

//get A post

router.get('/:id', async (req,res) => {
    try {
        const post =await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

// get All Post 
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

module.exports = router;