const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const fs = require('fs')
const https = require('https');
const http = require('http');
require('dotenv/config');
// router start 
const movieRouter = require('./routes/movie');
// SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/movieback.duckdns.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/movieback.duckdns.org/fullchain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: certificate
};

/* middlewares start */
app.use(cors());
// 先parse
app.use(express.json());
// when post get hit, run movieRouter
app.use('/watchlist', movieRouter);
/* middlewares end */


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/.well-known/acme-challenge/PzjdoiaGuwni8S333_pIKEeegBuSfcHRffX1qjl4quY', (req, res) => {
    res.send('PzjdoiaGuwni8S333_pIKEeegBuSfcHRffX1qjl4quY.RGRWCq5zUZyHAxcTdJLylg8d3hNXnVmEpJxjFUuTOvU')
})

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connect to mongoDB');
})
// 連結資料庫資訊物件
const db = mongoose.connection;
// 沒連上回傳錯誤
db.on('error', console.error.bind(console), 'mongoDB error');

// app.listen(port, () => {
//     console.log('work')
// })
http.createServer(app).listen(80,()=>{
    console.log('http work');
});
https.createServer(credentials,app).listen(443,()=>{
    console.log('https work');
})