const express = require('express');

const {getAllUsers,getUserById,addUser,deleteUser,updateUser,loginUser} = require('../controllers/userRoutes')

const router = express.Router();

router.get('/',getAllUsers)

router.get('/:id',getUserById)

router.post('/',addUser)

router.delete('/:id',deleteUser)

router.put('/:id',updateUser)

router.post('/login', loginUser);

module.exports = router
