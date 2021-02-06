// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => callback(null, __dirname + '/../public/images'),
//     filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg' )
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require('multer');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
    local: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, __dirname + '/../public/images')
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb( err );

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName);
            })
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'dbras',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb( err );

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName);
            });
        }
    })

}

module.exports = {
    storage: storageTypes["s3"],
    limits:{
        fileSeze: 2* 1024 * 1024,
    },
    fileFilter: (req, file, cb) =>{
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cd(new Error("Invalid file type."));
        }
    }
}


// s3: multerS3({
//     s3: new aws.S3(),
//     bucket: 'dbras',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     key: (req, file, cb) =>
// })