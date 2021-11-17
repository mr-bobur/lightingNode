const express = require('express');
const City = require('../modules/City');
const router = express.Router();
const User = require('../modules/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});
router.post('/', async (req, res) => {
    const users = new User(req.body);
    try {
        const saveUser = await users.save();
        await City.updateMany({ '_id': saveUser.cities }, { $push: { users: saveUser._id } }).exec();
        res.json(saveUser);
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }


});

router.post('/:userId', async (req, res) => {
    try { 
        let city = await City.updateMany({ '_id': req.body.cities}, { $push: { users: req.params.userId } }).exec(); 
        let user = await User.updateMany({ '_id': req.params.userId }, { $push: { cities: req.body.cities } }).exec();
        res.json({city,user});
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        res.json(user);
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});




router.get('/:userId/cities', async (req, res) => {

    try {
        let user = await User.findById(req.params.userId);
        let cities = await User.find({ _id: user.cities });

        res.json(cities);
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.userId });
        res.json(removeUser);
    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});


router.patch('/:userId', async (req, res) => {
    try {
        let updatedOne = await User.updateOne({ _id: req.params.userId },
            {
                $set: {
                    password: req.body.password,
                    phone:req.body.phone,
                    token:req.body.token     
                }
            });
        //await City.updateMany({ '_id': updatedOne.cities }, { $push: { users: updatedOne._id } }).exec();

        let user = await User.findById(req.params.userId);

        res.json({ updatedOne, user });

    } catch (err) {
        res.status(404).json({success:false, data: err });
    }
});

module.exports = router;