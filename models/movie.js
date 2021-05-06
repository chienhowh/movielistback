const mongoose = require('mongoose'), Schema = mongoose.Schema;

// construct movie schema
const MovieSchema = new Schema({
    id: { type: Number, required: [true] },
    beenWatched: { type: Boolean, required: [true, false] },
    comment: String
});

// 建立可視屬性，但不存進DB
MovieSchema.virtual('url').get(() => { return 'test/' + this.id })

// creat model(collection name, schema)
module.exports = mongoose.model('Movie', MovieSchema);