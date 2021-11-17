const express = require('express');
const { mongo, Mongoose } = require('mongoose');

const router = express.Router();
const City = require('../modules/City');
const Device = require('../modules/Device');
const User = require('../modules/User');


router.get('/', async (req, res) => {
    const cities = await City.find();
    try {
        res.json(cities);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const cities = new City(req.body);
        const saveCity = await cities.save();

        res.json(saveCity);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }

});


router.get('/:cityId', async (req, res) => {
    try {
        const city = await City.findById(req.params.cityId);
        res.send(city);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

router.get('/:cityId/users', async (req, res) => {
    try {
        const city = await City.findById(req.params.cityId).populate('users');
        res.send(city.users);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

router.delete('/:cityId', async (req, res) => {
    try {
        const removeCity = await City.remove({ _id: req.params.cityId });
        res.json(removeCity);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});


// getting all devices of a city by id
router.get('/:cityId/devices', async (req, res) => {

    try {
        let city = await City.findById(req.params.cityId).populate('devices');
        res.json(city.devices);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});


// router.patch('/:cityId', async (req,res)=> {
//     try{
//          let updatedOne = await City.updateOne({_id: req.params.cityId}, {$set: {name: req.body.name}}); 
//          const city = await City.findById(req.params.cityId); 
//          res.json({updatedOne,city}); 
//     }catch(err){
//         res.status(404).json({success:false, data: err });
//     }
// });

router.patch('/:cityId', async (req, res) => {
    try {
        let updatedOne = await City.updateOne({ _id: req.params.cityId },
            {
                $set: {
                    name: req.body.name,
                    visiblity: req.body.visiblity,
                    automatic: req.body.automatic,
                    switch1: req.body.switch1,
                    switch2: req.body.switch2,
                    switch3: req.body.switch3,
                    longitude: req.body.longitude,
                    latitide: req.body.latitide,
                    sunrise: req.body.sunrise,
                    sunset: req.body.sunset,
                    ontime: req.body.ontime,
                    offtime: req.body.offtime,
                    ontimefix: req.body.ontimefix,
                    offtimefix: req.body.offtimefix,
                }
            });
        // Agar automatic o`zgarsa devicelani ham o`zgartirish  
        if (req.body.automatic != null) {
            console.log("hammasi o`zgardi");
            await Device.updateMany({ cities: req.params.cityId }, { automatic1: req.body.automatic });
           
        } 
        
        // switchlani xolatini o`zgaritish
        if (req.body.switch1 != null) {
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { switch1: req.body.switch1 });
        }
        if (req.body.switch2 != null) {
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { switch2: req.body.switch2 });
        }
        if (req.body.switch3 != null) {
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { switch3: req.body.switch3 });
        }

        // Vaqtlari bo`yicha o`zgarishlari
        if (req.body.ontime != null) {
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { ontime1: req.body.ontime });
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { ontime2: req.body.ontime });
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { ontime3: req.body.ontime });
        }
        if (req.body.offtime != null) {
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { offtime1: req.body.offtime });
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { offtime2: req.body.offtime });
            await Device.updateMany({ cities: req.params.cityId, automatic2: true }, { offtime3: req.body.offtime });
        }


        const city = await City.findById(req.params.cityId);
        res.json({ updatedOne, city });
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});



//Adding new device to city
router.post('/:cityId', async (req, res) => {

    console.log(req.body.device);
    try {
        let city = await City.findById(req.params.cityId);
        let device = await Device.findById(req.body.device);
        city.devices.push(device);
        await city.save();
        res.json(city);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});
module.exports = router;