var express = require('express');

var app = express();

var User = require('./model/User.js');

var bodyParser = require('body-parser');
const { BSONSymbol } = require('mongodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors = require('cors'); 
app.use(cors({
    origin:'*'
}));

app.use('/',express.static('files'));

app.get('/user/findAll',(req,res)=>{
    console.log('Get all users:');

    User.find((err,allusers) =>{
        if(err){
            console.log("Error in find all.",err);
            res.json({'status':false, 'data':err});
        }else{
            res.json({'status':true , 'data':allusers});
        }
    });
});

app.get('/user/findOne',(req,res)=>{
    console.log('Find a user');

    const username = req.query.username;

    console.log('Find user with username:',username);

    User.findOne({'username':username},(err,user)=>{
        if(err){
            console.log("Error in find user",username);
            res.json({'status':false, 'data':user});
        }else{
            res.json({'status':true, 'data':user});
        }
    })
});

app.post('/user/create',(req,res)=>{
    console.log("Insert user",req.body);

    const username =req.body.username;
    console.log("Insert user with username",username);


    let newUser = new User ({
        username:req.body.username,
        name:req.body.name,
        surname:req.body.surname,
        category:req.body.category,
        email:req.body.email
    });

    newUser.save((err)=>{
        if(err){
            console.log("Error in inserting user",err);
            res.json({'data':err,'status':false});
        }else{
            res.json({'data':newUser,'status':true})
        }
    })
});

app.delete('/user/delete',(req,res) =>{
    
    console.log('Delete user');

    const username = req.query.username;

    console.log('Delete user with username',username);

    User.findOneAndRemove({username:username},(err,user) => {
        if(err){
            console.log("Problem in deleting user",err);
            res.json({'status':false,'data':err});
        }else{
            res.json({'status':true,'data':user});
        }
    });
});


app.post('/user/update',(req,res)=>{
    console.log('Update user');


    const username = req.body.username;
    console.log('Update user with username', username);

    User.findOne({'username':username},(err,user)=>{
        if(err){
            res.json({'status':false, 'data':err});
        }else{
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.category = req.body.category;
            user.email = req.body.email;
            
            user.save((err)=>{
                if(err){
                    res.json({'status':false, 'data':err});
                }else{
                    res.json({'status':true, 'data':user});
                }
            })
        }
    })
});



app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});

