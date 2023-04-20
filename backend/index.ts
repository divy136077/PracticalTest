import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
// const upload = multer({ dest: 'uploads/' })

const mongoURL = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(mongoURL, () => {
    console.log('Connected to Database.');
})

const app = express()

const PORT = 8000;
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));
app.use('/signup', require('../backend/src/routes/sign'))
app.use('/user', require('../backend/src/routes/chat'))



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})