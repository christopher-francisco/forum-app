const mongoose = require('mongoose');

const Thread = require('../../../src/models/Thread');
const Comment = require('../../../src/models/Comment');
const User = require('../../../src/models/User');
const Vote = require('../../../src/models/Vote');

// The problem is basically that you can't rewire them after having
// import them on this file. Fuck this shit. I don't know how to fucking
// use Mongoose.

const usersData = [{
  displayName: 'A',
  email: 'a@mail.com',
  password: 'aaaa',
}, {
  displayName: 'B',
  email: 'b@mail.com',
  password: 'bbbb',
}];

async function seedDatabase() {
  const [ userA, userB ] = await User.create(usersData);

  const comments = await Comment.create([{
    body: '/r/me_irl',
    user: userB.id,
  }, {
    body: 'ikr',
    user: userA.id,
  }]);

  const [ threadA, threadB ] = await Thread.create([{
    title: 'Is Anakin Skywalker actually Darth Vader?',
    body: 'Yeah, he is LOL.',
    user: userA.id,
    comments: comments.map(comment => comment.id),
  }, {
    title: 'Did The Empire do anything wrong?',
    body: 'Well, to be fair, The Empire was established because thousands of systems were willing to participate in it. So no, it did not.',
    user: userA.id,
  }]);

  const [ voteA, voteB ] = await Vote.create([{
    thread: threadB.id,
    user: userA.id,
    value: 1,
  }, {
    thread: threadB.id,
    user: userB.id,
    value: 1,
  }]);

  threadA.votes.push(voteA, voteB);
  threadA.save();
}

function dropDatabase() {
  return mongoose.connection.dropDatabase();
}

module.exports = {
  seedDatabase,
  dropDatabase,
};
