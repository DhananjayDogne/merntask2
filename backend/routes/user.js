const router = require('express').Router();
const User = require('../models/User');

//
router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send({ user });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


module.exports = router;