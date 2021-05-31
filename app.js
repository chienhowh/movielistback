const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const cors = require('cors')
const port = 80;
require('dotenv/config');

// router start 
const movieRouter = require('./routes/movie');


/* middlewares start */
app.get('/.well-known/acme-challenge/x0mUpwJh5FtpGeCEES7U43UILEbLKOKjhUISSw-9pBA',(req,res)=>{
    res.send('x0mUpwJh5FtpGeCEES7U43UILEbLKOKjhUISSw-9pBA.IsvVulhqVT4gaQTFIQKqo1zwstDzN1YbdwQ69BzJBGU')
})
app.use(cors());
// 先parse
app.use(express.json());
// when post get hit, run movieRouter
app.use('/watchlist', movieRouter);
/* middlewares end */


app.get('/', (req, res) => {
    res.send('hello world')
})


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connect to mongoDB');
})
// 連結資料庫資訊物件
const db = mongoose.connection;
// 沒連上回傳錯誤
db.on('error',console.error.bind(console),'mongoDB error');

app.listen( port, () => {
    console.log('work')
})
// http.createServer(app).listen(port);