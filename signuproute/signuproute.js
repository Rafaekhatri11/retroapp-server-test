const express = require('express');
const router = express.Router();
const createuser = require('../modal/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', (req, res, next) => {
    const body = JSON.parse(req.body.json);
    createuser.find({ "Email": body.Email })
         .then(user => {
             if (user.length >= 1) {
                 return res.status(201).json({
                     message: "This email address is already exist please try a new one"
                 });
             } else {
                 bcrypt.hash(body.Pass, 10, (err, hash) => {
                     console.log(req)
                     if (err) {
                         
                         return res.status(201).json({
                             message: err
                         });
                     } else {
                         
                         const User = new createuser({
                             //  id : new mongoose.Types.ObjectId,
                             Email: body.Email,
                             Firstname: body.Firstname,
                             Lastname : body.Lastname,
                             Status : body.Status,
                             Pass: hash
                         });
 
                         User.save()
                             .then(result => {
                                 console.log("======",result);
                                 const token = jwt.sign({
                                     email: result.Email,
                                     userId: result._id
                                 }, 'secret',
                                     {
                                         expiresIn: '1h'
                                     }
                                 )
                                 res.status(201).json({
                                     message: 'Register Successfully',
                                     token: token
                                 })
                                 
                             })
                             .catch(err => {
                                 res.status(201).json({
                                     message: err
                                 });
                             });
                     }
 
                 })
             }
         })
 
 
 });
 

 router.post("/login", (req, res, next) => {
    const body=JSON.parse(req.body.json);
    createuser.find({"Email": body.Email }).exec()
        .then(user => {
            console.log('line no 72', user,body)
            if (user.length < 1) {
                return res.status(200).json({
                    message: 'Auth Failed'
                });
            }
            bcrypt.compare(body.Pass, user[0].Pass, (err, result) => {
                if (err) {
                    
                    return res.status(401).json({
                        message: 'Auth Failed'
                    })
                }
                if (result) {
                
                    const token = jwt.sign({
                        email: user[0].Email,
                        userId: user[0]._id,
                        Firstname: user[0].Firstname,
                        Lastname : user[0].Lastname,
                        Status : user[0].Status,
                    }, 'secret',
                        {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).json({
                        message: 'Successfully Log In',
                        token : token,
                        Email: body.Email,
                         
                    })
                
                }
               
                // res.status(200).json({
                //     message: 'Auth Failed'
                    
                // })
            });
        }).catch(err => {
            console.log(err);
            return res.status(401).json({
                message: err
            })
        })
})



router.post("/me",(req,res,next) => {
    const body=JSON.parse(req.body.json);
    createuser.find({"Email": body.Email }).exec()
    .then(user =>{
            console.log( '======== line 123',user);
    })
})
 module.exports = router;