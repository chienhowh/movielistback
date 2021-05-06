const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require('dotenv/config');

// router start 
const movieRouter = require('./routes/movie');

/* middlewares start */
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

app.listen(port, () => {
    console.log('work')
})