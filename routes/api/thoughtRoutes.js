// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const { 
    createThought, 
    getAllThoughts, 
    getSingleThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// GET route
router.route('/').get(getAllThoughts);

// GET, PUT & DELETE routes
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought); 

// POST route
router.route('/:userId').post(createThought);

// POST route
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE route
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;