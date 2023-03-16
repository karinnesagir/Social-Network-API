const {User} = require('../models');

module.exports = {
    // GET all users
    getAllUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        // Populate thoughts and friends data
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a new user
    createUser(req, res) {
      User.create(req.body)
        .then((userDB) => res.json(userDB))
        .catch((err) => res.status(500).json(err));
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
      User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true, runValidators: true})
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove user by its _id
    deleteUser(req, res) {
      User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$push: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove user by its _id
    deleteFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};