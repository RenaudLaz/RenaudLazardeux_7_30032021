const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

// POST
router.post('', auth, multer, postCtrl.createPost);
//GET
router.get('', auth, postCtrl.getAllPosts);
//PUT
router.put('/:postId', auth, multer, postCtrl.modifyPost);
//DELETE
router.delete('/:postId', auth, postCtrl.deletePost);


module.exports = router;