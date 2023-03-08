const router = require('express').Router();
const thoughRoute = require('./thoughRoutes');
const userRoute = require('./userRoutes');

router.use('/thoughts', postRoutes);
router.use('/users', commentRoutes);

module.exports = router;