const DevisData = require('../models/formDevis')
const Image = require('../models/ImageDevis');
const fs = require('fs');
const path = require('path');

exports.uploadImg = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const formDataId = req.body.formDataId;
    const imageFiles = [];
    try {
        for (const file of req.files) {
            const imageFile = `${req.protocol}://${req.get('host')}/images/${file.filename}`;
            imageFiles.push(imageFile);

            const newImage = new Image(imageFile, formDataId);
            const imageIdResult = await newImage.save();
            const imageId = imageIdResult.insertId;
            const devisData = new DevisData({ id: formDataId });
            console.log(imageId)
            if (imageId != undefined) {
                await devisData.linkImageId(imageId);
            } else {
                console.log('Ca plante id')
            }

            const filePath = path.join(__dirname, '..', 'images', file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Save controller vers bdd image ok !");
            } else {
                console.log('Ca plante save controller !!')
            }
        }

        res.status(201).json({ message: 'Upload img ok', images: imageFiles });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload error' });
    }
};

exports.getAllImages = async (req, res) => {
    try {
        const allImages = await Image.getAllImages();
        res.json({ images: allImages });
        // const stringData = JSON.stringify(allImages[0][0].image_data)
        // const jsonData = JSON.parse(stringData)
        
        // let temp = ''
        // jsonData.data.map(e=>{
        //     temp += e.toString(16)
        // })

        // const buffer = Buffer.from(temp, 'hex')
        // fs.writeFileSync('test.jpg', buffer, 'binary')

        allImages[0].map(e => {
            if (e.image_data !== null || e.image_data !== undefined) {
               const binaryImg = Buffer.from(e.image_data, 'hex').toString('base64');
               fs.writeFileSync('image.txt', binaryImg, 'binary');
            }
        })


        // console.log(allImages)
    } catch (error) {
        console.error('controller affichage img plante:', error);
        res.status(500).json({ error: 'controller affichage img plante' });
    }
};