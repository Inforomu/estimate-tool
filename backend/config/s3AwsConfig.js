require('dotenv').config();

exports.getAwsConfig = () => ({
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucketName: 'imagesestimate',
    },
})