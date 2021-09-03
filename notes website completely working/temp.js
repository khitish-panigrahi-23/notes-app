const express = require('express')
require('dotenv').config()
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const hbs = require('hbs')
const port =process.env.PORT;
// var FroalaEditor = require('wysiwyg-editor-node-sdk');
// var fs = require('fs');


app.use(bodyParser.urlencoded({
  extended: true
}));

const publicDirectoryPath =__dirname;
// const findOrCreate = require('mongoose-findorcreate');
app.use(express.static(publicDirectoryPath))
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// verification part starts
const session = require('express-session');
const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// verification part ends


// var bodyParser = require('body-parser');
const company = require('./companydata.js');
const data = require('./store_data.js');
const folder = require('./folderdata.js');
const led = require('./leddatabase.js');
const user = require('./user_data.js');
// const topic = require('./topic.js');
const { type } = require('os');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(express.static(publicDirectoryPath))


// paste it where new user is created
// after model being created
passport.use(user.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, newuser) {
    done(err, newuser);
  });
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://ourpersonalnote.herokuapp.com/auth/google/ournote",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  // console.log(profile);
  user.findOrCreate({ googleId: profile.id ,displayName:profile.displayName,imgurl:profile.photos[0].value}, function (err, newuser) {
    return cb(err, newuser);
  });
}
));
// 

app.get('/',async (req,res)=>{
  if(req.isAuthenticated()){
    var outputArray = []; 
    var alldata=await data.find({user_id:req.user.id}).exec().then(mydata=>{
      // console.log(typeof(mydata[0]));
      // console.log((mydata[0].storedata));
      for(var key in mydata){
        outputArray.push(mydata[key].title);
      }
      const retsub=[];
      outputArray.forEach((element)=>{
          retsub.push({name:element});
      })
      console.log(retsub);
      res.render('perfect',{values: retsub})
  });
}else{
  res.redirect("/newsignup");
}
})

// app.get('/check',async(req,res)=>{
//   var outputArray = []; 
//     var alldata=await data.find({user_id:'5f2d5f90bb61bb00171d2904'}).exec().then(mydata=>{
//       // console.log(typeof(mydata[0]));
//       // console.log((mydata[0].storedata));
//       for(var key in mydata){
//         outputArray.push(mydata[key].title);
//       }
//       const retsub=[];
//       outputArray.forEach((element)=>{
//           retsub.push({name:element});
//       })
//       console.log(retsub);
//       res.render('perfect',{values: retsub})
//   });
// })

app.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }));

app.get("/auth/google/ournote",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/newperfect");
  });


app.get('/login',(req,res)=>{
  //  res.sendFile(publicDirectoryPath+'/static/login.html') will work perfect but i am using hbs;
  res.render('login')
  // res.send('room'); //this will not work
})

app.get('/imgurl',async (req,res)=>{
  var imgurldata=await user.find({_id:req.user.id}).exec().then(mydata=>{
    // console.log(mydata);
    res.send({"imgurl": mydata[0].imgurl,"name":mydata[0].displayName})
});
})

// app.get('/newsignup',(req,res)=>{
//   res.render('signup')
// })

// app.post('/newsignup',async (req,res)=>{
//   console.log(req.body);
//   console.log(typeof(req.body));
//   user.register({username:req.body.name, active: true}, req.body.password, function(err, newuser) {
//     if (err) { 
//       console.log("got error in strt "+err);
//      }
//     var authenticate = user.authenticate();
//     authenticate('username', 'password', function(err, result) {
//       if (err) { 
//         console.log("got error in auth "+err);
//        }
//        else{
//          res.send({"status":"cool"})
//        }
   
//       // Value 'result' is set to false. The user could not be authenticated since the user is not active
//     });
//   });
// })

// app.get('/topic',(req,res)=>{
//   const newtopic = new topic({
//       topic_id:"ragnarok"
//   })
//   newtopic.save().then(() => {
//       res.send(newtopic)
//   }).catch((e) => {
//       res.send({bad:e})    //notice how we are sending status
//   })
// })

// app.get('/test_data', async (req,res)=>{
//   var outputArray = []; 
//   var alldata=await topic.find({}).exec().then(mydata=>{
//     // console.log(typeof(mydata[0]));
//     // console.log((mydata[0].storedata));
//     for(var key in mydata){
//       outputArray.push(mydata[key].topic_id);
//     }
//     res.send(outputArray);
// });
  
// })

app.get('/newperfect',async (req,res)=>{
  if(req.isAuthenticated()){
    var outputArray = []; 
    var alldata=await data.find({user_id:req.user.id}).exec().then(mydata=>{
      // console.log(typeof(mydata[0]));
      // console.log((mydata[0].storedata));
      for(var key in mydata){
        outputArray.push(mydata[key].title);
      }
      const retsub=[];
      outputArray.forEach((element)=>{
          retsub.push({name:element});
      })
      console.log(retsub);
      res.render('perfect',{values: retsub})
  });
}else{
  res.redirect("/newsignup");
}
})

// app.get('/perfect', async (req,res)=>{
//   var outputArray = []; 
//       var alldata=await data.find({}).exec().then(mydata=>{
//         // console.log(typeof(mydata[0]));
//         // console.log((mydata[0].storedata));
//         for(var key in mydata){
//           outputArray.push(mydata[key].title);
//         }
//         const retsub=[];
//         outputArray.forEach((element)=>{
//             retsub.push({name:element});
//         })
//         console.log(retsub);
//         res.render('perfect',{values: retsub})
//     });
// })

// app.get('/strict', async (req,res)=>{
//       var outputArray = []; 
//       var alldata=await data.find({}).exec().then(mydata=>{
//         // console.log(typeof(mydata[0]));
//         // console.log((mydata[0].storedata));
//         for(var key in mydata){
//           outputArray.push(mydata[key].user_id);
//         }
//         const retsub=[];
//         outputArray.forEach((element)=>{
//             retsub.push({name:element});
//         })
//         console.log(retsub);
//         res.render('perfect',{values: retsub})
//     });
// })

app.get('/notes',async(req,res)=>{
    // var gotdata=await data.findOne({user_id: 'deadpool23'}, function (err, result) {
    //     if (!err) {
    //         res.send({"Status":result.storedata});
    //     }
    //     else{
    //         res.send({"Status":"Error"});
    //     }
    //   });

    //the above is perfectly working but the below code is for all the notes of a given user and the above code fetches only one nopte of the user
      var alldata=await data.find({}).exec().then(mydata=>{
          // console.log(typeof(mydata[0]));
          // console.log((mydata[0].storedata));
          var myreply='';
          for(var key in mydata){
            myreply+=mydata[key].storedata;
          }
             res.send({"Status":myreply,"title":'BabaYaga'});
      });
      
  })

  app.get('/eachnote',async(req,res)=>{
    console.log("working "+req.query.id);
    if(req.query.id===undefined){
      res.send({"Status":"Fetching Failed"});
    }
    var gotdata=await data.findOne({title: req.query.id}, function (err, result) {
        if (!err) {
            res.send({"Status":result.storedata});
        }
        else{
            res.send({"Status":"Error"});
        }
      });

      //the above is perfectly working but the below code is for all the notes of a given user and the above code fetches only one nopte of the user
      // var alldata=await data.find({}).exec().then(mydata=>{
      //     // console.log(typeof(mydata[0]));
      //     // console.log((mydata[0].storedata));
      //     var myreply='';
      //     for(var key in mydata){
      //       myreply+=mydata[key].storedata;
      //     }
      //        res.send({"Status":myreply,"title":'BabaYaga'});
      // });
      
  })

  // app.post('/login',async(req,res)=>{
  //   var outputArray = []; 
  //   var alldata=await data.find({}).exec().then(mydata=>{
  //     // console.log(typeof(mydata[0]));
  //     // console.log((mydata[0].storedata));
  //     for(var key in mydata){
  //       outputArray.push(mydata[key].user_id);
  //     }
  //     const retsub=[];
  //     outputArray.forEach((element)=>{
  //         retsub.push({name:element});
  //     })
  //     console.log(retsub);
  //     res.render('perfect',{values: retsub})
  // });
  // })
  // app.post('/signup',(req,res)=>{
  //   res.send({'status':'Ok'});
  // })

app.post('/',async(req,res)=>{
    console.log(req.body);
    const newdata = new data({
        storedata:req.body.body_text,
        title:req.body.desktitle,
        user_id:req.user.id
    })
    newdata.save().then(() => {
        res.send(newdata)
    }).catch((e) => {
        res.send({bad:e})    //notice how we are sending status
    })
  })
  app.post('/editnote',async(req,res)=>{
    data.deleteOne({ title:req.body.desktitle }).then(function(){ 
        console.log("Data deleted"); // Success 
        const newdata = new data({
            storedata:req.body.body_text,
            title:req.body.desktitle,
            user_id:req.user.id
        })
        newdata.save().then(() => {
            res.send(newdata)
        }).catch((e) => {
            res.send({bad:e})    //notice how we are sending status
        })
    }).catch(function(error){ 
        console.log(error); // Failure 
    });
})

app.post('/delnote',async(req,res)=>{
  data.deleteOne({ title:req.body.desktitle }).then(function(){ 
      console.log("Data deleted"); // Success 
      res.send({"Status":"Deleted"});
  }).catch(function(error){ 
      console.log(error); // Failure 
  });
})

app.get('/addfolder',async (req,res)=>{
  if(req.isAuthenticated()){
    var outputArray = []; 
    var alldata=await folder.find({user_id:req.user.id}).exec().then(mydata=>{
      // console.log(typeof(mydata[0]));
      // console.log((mydata[0].storedata));
      for(var key in mydata){
        outputArray.push(mydata[key].foldername);
      }
      var set2 = new Set(outputArray); 
      const retsub=[];
      set2.forEach((element)=>{
          retsub.push({name:element});
      })
      
      console.log(retsub);
      res.render('folderpage',{values: retsub})
      
  });
  }
  else{
    res.redirect("/newsignup");
  }
})


app.get('/gotofolder',async (req,res)=>{
  if(req.isAuthenticated()){
    const foldernamegot=req.query.folder;
    var gotdata=await folder.find({foldername: foldernamegot,user_id:req.user.id}, function (err, result) {
      if (!err) {
        var outputArray = []; 
        for(var key in result){
          outputArray.push(result[key].title);
        }
        const retsub=[];
        outputArray.forEach((element)=>{
            retsub.push({name:element});
        })
        
        res.render('notefolder',{values: retsub,foldname:foldernamegot})
      }
      else{
          res.send({"Status":"Error"});
      }
    });
  }
  else{
    res.redirect("/newsignup");
  }
 
})

app.post('/addfolder',async(req,res)=>{
  console.log(req.body);
  const newfolder = new folder({
      storedata:req.body.body_text,
      title:req.body.desktitle,
      user_id:req.user.id,
      // user_id:"5f2d5f90bb61bb00171d2904",
      foldername:req.body.foldertitle
  })
  newfolder.save().then(() => {
    console.log("data saved");
      res.send(newfolder)
  }).catch((e) => {
      res.send({bad:e})    //notice how we are sending status
  })
})
app.get('/eachfolder',async(req,res)=>{
  // console.log("data "+req.query);
  console.log("working "+req.query.id+" "+req.query.foldname);
  if(req.query.id===undefined){
    res.send({"Status":"Fetching Failed"});
  }
  console.log("Testing "+typeof(req.query.id)+req.query.id);
  console.log("title"+req.query.id);
  console.log("fldname"+req.query.foldname);
  req.query.foldname = req.query.foldname.replace(/\s+/g, "");
  var alldata=await folder.find({title:req.query.id,foldername:req.query.foldname,user_id:req.user.id}).exec().then(mydata=>{
    // console.log(typeof(mydata[0]));
    console.log("Our "+mydata[0].storedata);
   res.send({"Status":mydata[0].storedata});
});
})

app.post('/editfolder',async(req,res)=>{
  req.body.foldname = req.body.foldname.replace(/\s+/g, "");
  folder.deleteOne({ title:req.body.desktitle,foldername:req.body.foldname}).then(function(){ 
      console.log("Data deleted"); // Success 
      const newfolder = new folder({
          storedata:req.body.body_text,
          title:req.body.desktitle,
          user_id:req.user.id,
          foldername:req.body.foldname
      })
      newfolder.save().then(() => {
          res.send({"Status":"Success"});
      }).catch((e) => {
        res.send({"Status":"Error1"});    //notice how we are sending status
      })
  }).catch(function(error){ 
      console.log(error); // Failure 
      res.send("Error 2")    //notice how we are sending status
  });
})

app.post('/delnotefolder',async(req,res)=>{
  req.body.foldname = req.body.foldname.replace(/\s+/g, "");
  folder.deleteOne({ title:req.body.desktitle,foldername:req.body.foldname }).then(function(){ 
      console.log("Data deleted"); // Success 
      res.send({"Status":"Deleted"});
  }).catch(function(error){ 
      console.log(error); // Failure 
  });
})

app.post('/delcompfolder',async(req,res)=>{
  req.body.foldname = req.body.foldname.replace(/\s+/g, "");
  folder.deleteOne({foldername:req.body.foldname }).then(function(){ 
      console.log("Data deleted"); // Success 
      res.send({"Status":"Deleted"});
  }).catch(function(error){ 
      console.log(error); // Failure 
  });
})

// app.get('/tempaddfolder',async (req,res)=>{
//   if(!req.isAuthenticated()){
//     var outputArray = []; 
//     var alldata=await folder.find({user_id:"5f2d5f90bb61bb00171d2904"}).exec().then(mydata=>{
//       // console.log(typeof(mydata[0]));
//       // console.log((mydata[0].storedata));
//       for(var key in mydata){
//         outputArray.push(mydata[key].foldername);
//       }
//       var set2 = new Set(outputArray); 
//       const retsub=[];
//       set2.forEach((element)=>{
//           retsub.push({name:element});
//       })
      
//       console.log(retsub);
//       res.render('folderpage',{values: retsub})
      
//   });
//   }
//   else{
//     res.redirect("/newsignup");
//   }
// })


// app.get('/tempgotofolder',async (req,res)=>{
//   if(!req.isAuthenticated()){
//     const foldernamegot=req.query.folder;
//     var gotdata=await folder.find({foldername: "baba",user_id:"5f2d5f90bb61bb00171d2904"}, function (err, result) {
//       if (!err) {
//         var outputArray = []; 
//         for(var key in result){
//           outputArray.push(result[key].title);
//         }
//         const retsub=[];
//         outputArray.forEach((element)=>{
//             retsub.push({name:element});
//         })
        
//         res.render('notefolder',{values: retsub,foldname:foldernamegot})
//       }
//       else{
//           res.send({"Status":"Error"});
//       }
//     });
//   }
//   else{
//     res.redirect("/newsignup");
//   }
 
// })



app.get('/myled',async (req,res)=>{
  if(req.isAuthenticated()){
    var outputArray = []; 
    var alldata=await led.find({user_id:req.user.id}).exec().then(mydata=>{
      // console.log(typeof(mydata[0]));
      // console.log((mydata[0].storedata));
      for(var key in mydata){
        outputArray.push(mydata[key].room);
      }
      const retsub=[];
      outputArray.forEach((element)=>{
          retsub.push({name:element});
      })
      console.log(retsub);
      res.render('ledpage',{values: retsub})
  });
}else{
  res.redirect("/newsignup");
}
})

// app.get('/tempmyled',async (req,res)=>{
//   if(!req.isAuthenticated()){
//     var outputArray = []; 
//     var alldata=await led.find({user_id:"5f2d5f90bb61bb00171d2904"}).exec().then(mydata=>{
//       // console.log(typeof(mydata[0]));
//       // console.log((mydata[0].storedata));
//       for(var key in mydata){
//         outputArray.push(mydata[key].room);
//       }
//       const retsub=[];
//       outputArray.forEach((element)=>{
//           retsub.push({name:element});
//       })
//       console.log(retsub);
//       res.render('ledpage',{values: retsub})
//   });
// }else{
//   res.redirect("/newsignup");
// }
// })

app.post('/myled',async(req,res)=>{
  led.deleteOne({ room:req.body.curroom,user_id:req.user.id}).then(function(){ 
      console.log("Data deleted"); // Success 
      const newled = new led({
          room:req.body.curroom,
          user_id:req.user.id,
          ledstatus:req.body.status
      })
      newled.save().then(() => {
          res.send({"Status":"Success"});
      }).catch((e) => {
        res.send({"Status":"Error1"});    //notice how we are sending status
      })
  }).catch(function(error){ 
      console.log(error); // Failure 
      res.send("Error 2")    //notice how we are sending status
  });
})

//it is for the internal request
app.get('/getledstatus',async(req,res)=>{
  // console.log("data "+req.query);
  console.log("working "+req.query.id);
  if(req.query.id===undefined){
    res.send({"Status":"Fetching Failed"});
  }
  var alldata=await led.find({room:req.query.id,user_id:req.user.id}).exec().then(mydata=>{
    // console.log(typeof(mydata[0]));
    console.log("Our "+mydata[0].ledstatus);
   res.send({"Status":mydata[0].ledstatus});
});
})

app.get('/getmyled',async(req,res)=>{
  // console.log("data "+req.query);
  console.log("working "+req.query.id);
    if(req.query.id===undefined){
      res.send({"Status":"Fetching Failed"});
    }
    var alldata=await led.find({user_id:req.query.id,room:req.query.room}).exec().then(mydata=>{
      console.log(typeof(mydata[0]));
      console.log((mydata[0]));
      if(mydata[0]===undefined){
        res.send({"Status":"No data with given details"});
      }
      else{
        console.log(mydata[0].ledstatus);
        res.send(mydata[0].ledstatus);
      }
  });
})

app.post('/getmyled',async(req,res)=>{
  led.deleteOne({ room:req.body.room,user_id:req.body.id}).then(function(){ 
    console.log("Data deleted"); // Success 
    const newled = new led({
        room:req.body.room,
        user_id:req.body.id,
        ledstatus:req.body.status
    })
    newled.save().then(() => {
        res.send(newled.ledstatus);
    }).catch((e) => {
      res.send("Error1");    //notice how we are sending status
    })
}).catch(function(error){ 
    console.log(error); // Failure 
    res.send("Error 2")    //notice how we are sending status
});
})

app.get('/addcompany',async (req,res)=>{
  if(!req.isAuthenticated()){
    var outputArray = []; 
    var alldata=await company.find({user_id:"5f2d5f90bb61bb00171d2904"}).exec().then(mydata=>{
      // console.log(typeof(mydata[0]));
      // console.log((mydata[0].storedata));
      for(var key in mydata){
        outputArray.push(mydata[key].companyname);
      }
      var set2 = new Set(outputArray); 
      const retsub=[];
      set2.forEach((element)=>{
          retsub.push({name:element});
      })
      
      console.log(retsub);
      res.render('companypage',{values: retsub})
      
  });
  }
  else{
    res.redirect("/newsignup");
  }
})


app.get('/yearcompany',async (req,res)=>{
  if(!req.isAuthenticated()){
    const companynamegot=req.query.company;
    var gotdata=await company.find({companyname: companynamegot,user_id:"5f2d5f90bb61bb00171d2904"}, function (err, result) {
      if (!err) {
        var outputArray = []; 
        for(var key in result){
          outputArray.push(result[key].title);
        }
        const retsub=[];
        outputArray.forEach((element)=>{
            retsub.push({name:element});
        })
        
        res.render('yearcompany',{values: retsub,compname:companynamegot})
      }
      else{
          res.send({"Status":"Error"});
      }
    });
  }
  else{
    res.redirect("/newsignup");
  }
 
})

app.post('/addcompany',async(req,res)=>{
  console.log(req.body);
  const newcompany = new company({
      storedata:req.body.body_text,
      title:req.body.yeartitle,
      // user_id:req.user.id,
      user_id:"5f2d5f90bb61bb00171d2904",
      companyname:req.body.companytitle
  })
  newcompany.save().then(() => {
    console.log("data saved");
      res.send(newcompany);
  }).catch((e) => {
      res.send({bad:e})    //notice how we are sending status
  })
})

app.get('/eachcompany',async(req,res)=>{
  // console.log("data "+req.query);
  console.log("working "+req.query.id+" "+req.query.companyname);
  if(req.query.id===undefined){
    res.send({"Status":"Fetching Failed"});
  }
  console.log("Testing "+typeof(req.query.id)+" "+req.query.id);
  console.log("title "+req.query.id);
  console.log("companyname "+req.query.companyname);
  req.query.companyname=req.query.companyname.replace(/\s+/g, "");
  // req.user.id
  var alldata=await company.find({title:req.query.id,companyname:req.query.companyname,user_id:"5f2d5f90bb61bb00171d2904"}).exec().then(mydata=>{
    // console.log(typeof(mydata[0]));
    console.log("Our "+mydata[0].storedata);
   res.send({"Status":mydata[0].storedata});
}).catch((e) => {
  console.log("got some error "+e);
  res.send({bad:e})    //notice how we are sending status
});
})
app.get('/*',(req,res)=>{
  res.render('signup')
})

// app.post('/upload_image', function (req, res) {

//   // Store image.
//   console.log("GOt Img request")
//   FroalaEditor.Image.upload(req, '/uploads/', function(err, data) {
//     // Return data.
//     if (err) {
//       return res.send(JSON.stringify(err));
//     }

//     res.send(data);
//   });
// });
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})