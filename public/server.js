const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.static('assets/bim'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/bim')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
        //'BIM.xlsx
        //tambah server.js dekat public
        //buat folder asset
        //asal:file.originalname
    }
});

const upload = multer({storage}).array('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});

app.listen(8001, () => {
    console.log('App is running on port 8001')
});