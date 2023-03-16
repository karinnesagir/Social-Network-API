// Require Thoughts and Users Models
const {Thought, User} = require('../models');

// Set up Thoughts Controller
module.exports = {
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: req.params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(thoughtDB => {
            if(!thoughtDB) {
                res.status(404).json({message: 'No thought with this ID!'});
                return;
            }
            res.json(thoughtDB)
        })
        .catch(err => res.json(err)); 
    },
    // Get all available Thoughts
    getAllThoughts(req,res) {
        Thought.find()
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(thoughtDB => res.json(thoughtDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Get a certain thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(thoughtDB => {
            if(!thoughtDB) {
            res.status(404).json({message: 'No thought with this ID!'});
            return;
        }
        res.json(thoughtDB)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // Update a current thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(thoughtDB => {
            if (!thoughtDB) {
                res.status(404).json({message: 'No thought with this ID!'});
                return;
            }
                res.json(thoughtDB);
        })
        .catch(err => res.json(err));
    },
    // Delete a current thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then(thoughtDB => {
            if (!thoughtDB) {
                res.status(404).json({message: 'No thought with this ID!'});
                return;
            }
            res.json(thoughtDB);
            })
            .catch(err => res.status(400).json(err));
    },
    // Add a new Reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtDB => {
        if (!thoughtDB) {
            res.status(404).json({message: 'No thought with this ID!'});
            return;
        }
        res.json(thoughtDB);
        })
        .catch(err => res.status(400).json(err))

    },
    // Delete a reaction by ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(thoughtDB => {
            if (!thoughtDB) {
                res.status(404).json({message: 'No thought with this ID!'});
                return;
            }
            res.json(thoughtDB);
        })
        .catch(err => res.status(400).json(err));
    }
};