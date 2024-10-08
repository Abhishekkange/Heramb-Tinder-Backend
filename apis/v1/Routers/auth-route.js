const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {createJWT,verifyJwt} = require('../utilities/jwt-handler');

router.post('/login',async(req,res)=>{

    const email = req.body.email;
    const token = req.body.token;

    const user = await User.findOne({

        email:email
    });
    if(user){

        if(user.token == token)
        {
            //user loginned send JWT token
            const jwt = createJWT(user._id,"shahrukhKhan");
            res.json({"message":jwt,type:"login"});
        }
        else {
            //login failed
            res.json({"message": "Login failed",type:"error"});
        }
    }
    else{
        //create new user 
        const user = new User ({

            email:email,
            token:token
        });

        const savedUser = await user.save();
        //send JWT of saved user
        const jwt = createJWT(savedUser._id,"shahrukhKhan");
        res.json({"message":jwt,type:"signedup"});

    }

});


module.exports = router;