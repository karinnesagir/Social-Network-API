const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// GET & POST a user
router.route('/').get(getAllUsers).post(createUser);

// GET, PUT & DELETE user by id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// POST & DELETE friends to and from user's friend list 
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;