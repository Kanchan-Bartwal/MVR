const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.pre('save', function (next){
    var user = this;
    if(this.isModified("password") || this.isNew){
        bcrypt.genSalt(10, function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

userSchema.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// userSchema.pre('findOneAndUpdate', function (next){
    
//     const user = this;
//     const {newUpdate} = user.getUpdate();
//     console.log(queryCondition);
//     const queryCondition = user._condition;
//     var newPass = this._update['password'];
//         bcrypt.genSalt(10, function(err,salt){
//             if(err){
//                 return next(err);
//             }
//             bcrypt.hash(newPass, salt, function(err,hash){
//                 if(err){
//                     return next(err);
//                 }
//                 user.findOneAndUpdate(queryCondition, {'password': hash});
//                 next();
//             });
//         });
// });

module.exports = mongoose.model("User", userSchema);
