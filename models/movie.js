const mongoose = require('mongoose'), Schema = mongoose.Schema;

// construct movie schema
const MovieSchema = new Schema({
    id: { type: Number, required: [true] },
    title: { type: String, required: [true] },
    beenWatched: { type: Boolean, default: false },
    comment: String,
    watchedDate: { type: Date }
});

// 建立可視屬性，但不存進DB
MovieSchema.virtual('url').get(() => { return 'test/' + this.id })

// creat model(collection name, schema)
module.exports = mongoose.model('Movie', MovieSchema);