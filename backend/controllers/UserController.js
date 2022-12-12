const userModel = require('../models/UserSchema');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const { CompletePayment } = require('../utils/CompletePayment');
exports.CreateUser= async (req, res) => {
    try {
        //const response=await CompletePayment(req.body);
        // console.log(req.body);

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        const user=await userModel.find({email:req.body.email});
        if(user.length>0)
        {
            res.status(403).send("User already exists");
        }
        else
        {
            const user = new userModel({
                name: req.body.fullName,
                email: req.body.email,
                password: password,
                mobile: req.body.mobile,
                age: req.body.age,
                gender:req.body.gender,
                shift:req.body.shift,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            await user.save();
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            res.status(200).send({token:token});
        }

    } catch (err) {

       throw err;
    }
}
exports.Login= async (req, res) => {
    try {
        
        const user=await userModel.find({email:req.body.email});
        if(user.length>0)
        {
            const password=user[0].password;
            const isMatch=await bcrypt.compare(req.body.password,password);
            if(isMatch)
            {
                const token=jwt.sign({id:user
                    [0]._id},process.env.JWT_SECRET);
                res.status(200).send({token:token});
            }
            else
            {
                res.status(401).send("Incorrect password");
            }
        }
        else
        {
            res.status(401).send("User does not exist");
        }

    } catch (err) {

       
    }
}
exports.ChangeShift= async (req, res) => {
    try {
        const user=await userModel.findOne
        ({
            _id:req.user.id
        });
        console.log(user);
        if(user)
        {
           
            if(user.shift=='0')
            {
                console.log(req.body.ShiftId)
                 user.shift=req.body.ShiftId;
                 await user.save();
                res.status(200).send("Shift changed");
            }
            else
            {
                res.status(400).send("You can change your shift next month");
            }
                    
        }
        else
        {
            res.status(401).send("User does not exist");
        }
    }
    catch(err)
    {
        throw err;
    }
}
exports.GetPlan= async (req, res) => {
    try {
        console.log(req.user);
        const user=await userModel.find
        ({
            _id:req.user.id
        });
        if(user.length>0)
        {
            res.status(200).send(user[0].shift);

        }
    }
    catch(err)
    {
        throw err;
    }
}
  
exports.authenticateToken =async(req, res, next) =>{
    console.log(req.headers)

    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }