const router = require('express').Router();
const Doctor = require('./doctor.model')
const cloudinary = require('cloudinary')


router.get('/', async (req, res) => {
    Doctor.find().then(doc => res.json(doc)).catch((error) => {
        res.status(409).json({ message: "Error " + error.message })
    })
})

router.post('/search', async (req, res) => {
    const data = new RegExp(req.body.search, 'i');
    console.log(data);
    Doctor.find({ address: { $regex: data } }).then(doc => res.json(doc)).catch(error => {
        res.status(409).json({ message: "error " + error.message })
    })
})

router.post('/delete', async (req, res) => {
    await Doctor.findOneAndRemove({ name: req.body.name }).then(doc => res.json(doc)).catch(error => {
        res.status(409).json({ message: "error " + error.message })
    })
})

router.post('/update', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const photo = req.body.photo;
    const degree = req.body.degree;
    const fees = req.body.fees;
    const appointment_time = req.body.appointment_time;
    const address_point = req.body.address_point;
    const address = req.body.address;

    try {
        const photoURL = req.body.photo;
        const uploadResponse = await cloudinary.uploader.upload(photoURL, {
            upload_preset: 'ml_default'
        })
        const pic = uploadResponse.public_id;

        const response = await Doctor.updateOne({ name: name }, {
            $set: {
                degree,
                appointment_time,
                fees,
                address,
                address_point,
                email,
                photo: pic,
                number,

            }
        })
        res.json("successfully updated!!")

    } catch (error) {
        console.log(error);
    }

})

router.post('/add', async (req, res) => {
    try {
        const photoURL = req.body.photo;
        const uploadResponse = await cloudinary.uploader.upload(photoURL, {
            upload_preset: 'ml_default'
        })
        const pic = uploadResponse.public_id;
        const body = {
            name: req.body.name,
            degree: req.body.degree,
            appointment_time: req.body.appointment_time,
            fees: req.body.fees,
            address: req.body.address,
            address_point: req.body.address_point,
            email: req.body.email,
            photo: pic,
            number: req.body.number,
        }
        console.log(body);
        const newDoctor = new Doctor(body);
        await newDoctor.save();

        res.status(201).json(newDoctor);

    } catch (error) {
        res.status(409).json({ message: "Error " + error.message })
    }
})



module.exports = router