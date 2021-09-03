const mongoose = require('mongoose')
// const session = require('express-session');
// const passport = require("passport");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect('mongodb+srv://babayaga:deadpool%4023@cluster0-thfbe.mongodb.net/newnotesapp?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    googleId: String,
    displayName:String,
    imgurl:String
  });

  userSchema.plugin(passportLocalMongoose, {
    // Set usernameUnique to false to avoid a mongodb index on the username column!
    usernameUnique: false,
    findByUsername: function(model, queryParameters) {
      // Add additional query parameter - AND condition - active: true
      queryParameters.active = true;
      return model.findOne(queryParameters);
    }
  });
// userSchema.plugin(findOrCreate);
userSchema.plugin(findOrCreate);
const user = mongoose.model('user', userSchema)
module.exports = user;