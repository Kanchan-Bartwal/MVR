const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config/dbconfig");
const bcrypt = require("bcryptjs"); 
const user = require("../models/user");
const UserInfo = require("../models/user_info");


var functions = {
    addNew: function(req,res) {
        if((!req.body.email) || (!req.body.password)){
            res.json({
                success: false,
                msz: "Enter all fields"
            });
        }
        else{
            var newUser = User({
                email: req.body.email,
                password: req.body.password
            });
            UserInfo.findOne({
                email: req.body.email
            },function(err, user){
                if(err) {
                    return res.json({
                    success: false,
                    msz: "Failed to Save"
                });}
                else if(!user){
                    newUser.save(function(err, newUser){
                        if(err){
                            return res.json({
                                success: false,
                                msz: "Failed to Save"
                            });
                        }
                        else{
            var userinfo = new UserInfo({
                userID: newUser["_id"],
                name: req.body.name,
                email: req.body.email,
                movieWatched: [],
                reviews: []
            });
            userinfo.save(function(err, uinfo){
                if(err){
                    return res.json({
                        success: false,
                        msz: "Failed to Save"
                    });
                }
                else{
                            return res.json({
                                success: true,
                                msz: "Successfully Saved",
                                userID: newUser["_id"]
                            });
                                        }
            });
        
                        }
                    });                    
                }
                else{
                   return res.json({success: false, msz:"User Already Exist,Try to Login"});
                }
            });

            
        }
    },
    authenticate: function(req,res){
        User.findOne({
            email: req.body.email
        },function(err, user){
            if(err) {
                return res.json({
                    success: false,
                    msz: "Failed to Save"
                });
            }
            else if(!user){
                res.send({success: false, msz:"Authentication Failed,User Not Found"});
            }
            else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret);
                        res.json({
                            success: true,
                            token: token,
                            userID: user._id
                        });     
                    }
                    else{
                        return res.send({
                            success: false,
                            msz:"Authentication Failed,Wrong Password"
                        });
                    }
                });
            }
        });
    },
};

module.exports = functions;