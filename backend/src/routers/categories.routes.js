const express = require('express');
const router = express.Router();

const { CreateCategory, GetAllCategories} = require('../controller/categories.controller');


router.post('/create', CreateCategory);
router.get('/get', GetAllCategories);



module.exports = router;    