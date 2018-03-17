const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  }
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;
