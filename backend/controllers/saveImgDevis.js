const DevisData = require('../models/formDevis')
const Image = require('../models/ImageDevis');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const awsConfig = require('../config/s3AwsConfig');

exports.uploadImg = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const formDataId = req.body.formDataId;
    const imageFiles = [];
    try {
        for (const file of req.files) {
            if (!file.buffer || file.buffer.length === 0) {
                return res.status(400).json({ error: 'Invalid file buffer' });
            }
            const imageKey = `images/${uuidv4()}-${file.originalname}`;
            console.log(imageKey)
            const params = {
                Bucket: 'imagesestimate',
                Key: imageKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            
            const s3UploadResult = await new AWS.S3().upload(params).promise();
            const imageUrl = s3UploadResult.Location;
            const newImage = new Image(imageKey, formDataId);
            const imageIdResult = await newImage.save();
            const imageId = imageIdResult.insertId;
            const devisData = new DevisData({ id: formDataId });
            imageFiles.push(imageUrl);
            console.log(imageId)
            if (imageId != undefined) {
                await devisData.linkImageId(imageId);
            } else {
                console.log('Ca plante id')
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

// exports.getImagesForDevis = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const imagesForDevis = await Image.getImagesForDevis(id);

//       const signedUrls = await Promise.all(
//         imagesForDevis.map(async (image) => {
//           const imageKey = image.image_data;
//           const signedUrl = await generateSignedUrl(imageKey);
//           return signedUrl;
//         })
//       );
  
//       res.json({ images: signedUrls });
//     } catch (error) {
//       console.error('Erreur lors de la récupération des images pour le devis:', error);
//       res.status(500).json({ error: 'Erreur lors de la récupération des images pour le devis' });
//     }
// };

// const generateSignedUrl = async (imageKey) => {
//     const params = {
//         Bucket: 'imagesestimate',
//         Key: imageKey,
//         Expires: 60,
//     };

//     const signedUrl = await new AWS.S3().getSignedUrlPromise('getObject', params);
//     return signedUrl;
// };