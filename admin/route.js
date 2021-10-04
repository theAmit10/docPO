const router = require('express').Router();
const Admin = require('./admin.model');
const cloudinary = require('cloudinary');

router.get('/', (req, res) => {
    res.send("I am working");
})

router.post('/auth/signup', async (req, res) => {
    try {
        const photoURL = req.body.photo;
        const uploadResponse = await cloudinary.uploader.upload(photoURL, {
            upload_preset: 'ml_default'
        })
        const photo = uploadResponse.public_id;

        const body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            photo: photo,
        }
        const newAdmin = new Admin(body);
        console.log(body);
        await newAdmin.save();

        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})


router.post('/auth/login', async (req, res) => {
    const body = req.body;
    try {
        const admin = await Admin.findOne(body);

        if (admin) {
            res.status(200).json(admin)
        } else {
            res.send("Admin not Found!!")
        }

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

module.exports = router;