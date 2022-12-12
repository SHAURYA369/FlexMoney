const express=require('express');

const UserController=require('../controllers/UserController');
const router = express.Router();

router.post('/CreateUser', UserController.CreateUser);
router.post('/Login', UserController.Login);
router.post('/ChangeShift',UserController.authenticateToken,(req,res)=>{UserController.ChangeShift(req,res);});
router.post('/GetPlan',UserController.authenticateToken,(req,res)=>{
    UserController.GetPlan(req,res);});
module.exports = router;