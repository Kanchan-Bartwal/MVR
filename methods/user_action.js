
const UserInfo = require("../models/user_info");

var functions = {
    getUserInfo: function(req,res){
        var obj = req.query;
        UserInfo.find({
            userID: obj.userID
        }, function(err,userinfo){
            if(err) {return res.json({
                success: false,
                msz: "Failed to Save"
            });}
                else if(!userinfo){
                    return res.send({success: false, msz:"No UserInfo Found"});                  
                }
                else{
                    if(userinfo.length === 0){
                        return res.send({success: false, msz:"No UserInfo Found"});
                    }
                    else{
                        return res.send({success: true, msz: userinfo}); 
                }}
        });
    },
    watchingMovie: function(req,res){
        var obj = req.body;
        UserInfo.findOneAndUpdate(
            {
                userID: obj.userID
            },
            {
                $push: {
                    "movieWatched": obj.movie,
                }
                },
            function(err,stud){
    if(err) {
        return res.json({
            success: false,
            msz: "Failed to Save"
        });
    }
    else {
        return res.json({
            success: true,
            msz: "Successfully Saved"
        });
    }
    });
    },
    reviewingMovie: function(req,res){
        var obj = req.body;
        UserInfo.findOneAndUpdate(
            {
                userID: obj.userID
            },
            {
                $push: {
                  reviews: {  'movie': obj.movie,
                    'review': obj.review
                }
                }
            },
            function(err,stud){
    if(err) {
        return res.json({
            success: false,
            msz: "Failed to Save"
        });
    }
    else {
        return res.json({
            success: true,
            msz: "Successfully Saved"
        });
    }
    });      
        
      
    
    }
}

module.exports = functions;