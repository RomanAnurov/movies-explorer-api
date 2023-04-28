const router = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidation } = require('../middlewares/celebrate-validate');

router.get('/me', getUser);
router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
