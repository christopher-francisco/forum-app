const slug = require('slug');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ThreadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment',
  }],
  votes: [{
    type: ObjectId,
    ref: 'Vote',
  }],
});

// TODO: need testing
ThreadSchema.statics.getAllByUpvoteCount = function() {
  return this.aggregate([{
    $lookup: {
      from: 'votes',
      localField: 'votes',
      foreignField: '_id',
      as: 'votes',
    },
  }, {
    $addFields: {
      value: {
        $sum: '$votes.value',
      },
    },
  }, {
    $sort: {
      value: -1,
    },
  }, {
    $project: {
      value: 0,
    },
  } ]);
}

function createSlug(thread) {
  thread.slug = slug(thread.title);
}

ThreadSchema.pre('save', function(next) {
  createSlug(this);

  return next();
});

const ThreadModel = mongoose.model('Thread', ThreadSchema);

module.exports = ThreadModel;
