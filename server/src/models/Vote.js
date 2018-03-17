const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const VoteSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  thread: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate: value => Promise.resolve(value === 1 || value === -1),
  },
});

const VoteModel = mongoose.model('Vote', VoteSchema);

module.exports = VoteModel;
