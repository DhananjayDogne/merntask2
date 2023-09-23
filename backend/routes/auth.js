const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post('/createUser', async (req, res) => {
    
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        //create a user
        //create a salt to hash password
        var salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,

        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Login
router.post('/login', async (req, res) => { 
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Sorry a user with this email not exists" });
        }
        const compare = await bcrypt.compare(req.body.password, user.password);
        if(!compare){
            return res.status(400).json({ error: "Incorrect password " });
        }
        res.status(200).json(user);
           
    } catch {
        res.status(500).json(error);
       }
})

module.exports = router;