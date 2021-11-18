const express = require('express');
const City = require('../modules/City');
const Device = require('../modules/Device');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});
router.post('/', async (req, res) => {
    try {
        const device = new Device(req.body);
        await device.save();
        await City.updateMany({ '_id': device.cities }, { $push: { devices: device._id } }).exec();
        //await Device.updateMany({ '_id': device._id }, { $push: { cities: device.cities } }).exec();
        res.status(200).json({ success: true, data: device });
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

router.get('/:id/:temp', async (req, res) => {
    try {
        let updatedOne = await Device.updateOne({ _id: req.params.id },
            {
                $set: {
                    temp: Number(req.params.temp), 
                }
            });

        res.json( updatedOne);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

// get a device from DB by ID
router.get('/:deviceId', async (req, res) => {
    try {
        let device = await Device.findById(req.params.deviceId);

        res.send(device);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});


// get city of device fro db by ID
router.get('/:deviceId/city', async (req, res) => {

    try {
        let device = await Device.findById(req.params.deviceId);
        let city = await City.findById(device.cities);
        res.json(city);
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }

});




// delete device from DB by ID
router.delete('/:deviceId', async (req, res) => {
    try {
        const device = await Device.findById(req.params.deviceId);
        await City.updateMany({ '_id': device.cities }, { $pull: { devices: req.params.deviceId } });
        const removeDevice = await Device.remove({ _id: req.params.deviceId });
        res.json(removeDevice);
    } catch (err) {
        res.json(err);
    }
});


// o`zgartirish kodlari
router.patch('/:deviceId', async (req, res) => {
    try {
        let updatedOne = await Device.updateOne({ _id: req.params.deviceId },
            {
                $set: {
                    name: req.body.name,
                    automatic1: req.body.automatic1,
                    automatic2: req.body.automatic2,
                    switch1: req.body.switch1,
                    switch2: req.body.switch2,
                    switch3: req.body.switch3,
                    longitude: req.body.longitude,
                    latitide: req.body.latitide,
                    ontime1: req.body.ontime1,
                    offtime1: req.body.offtime1,
                    ontime2: req.body.ontime2,
                    offtime2: req.body.offtime2,
                    ontime3: req.body.ontime3,
                    offtime3: req.body.offtime3,
                    temp: req.body.temp,
                    status: req.body.status
                    
                }
            });

        const device = await Device.findById(req.params.deviceId);

        res.json({ updatedOne, device });
    } catch (err) {
        res.status(404).json({ success: false, data: err });
    }
});

module.exports = router;