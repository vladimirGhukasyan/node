var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    title: {type: String, required: true, unique: true},
    status: {type: Boolean},
    createdDate: {type: Date, default: Date.now}
});

mongoose.model('Article', schema);
module.exports = mongoose.model('Article');