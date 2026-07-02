const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/User');

const app = express();

app.use(cors());
app.use(bodyParser.json());


// CONNECT TO MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/devopslab')
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// REGISTER API
app.post('/register', async (req, res) => {

    try{

        const user = new User(req.body);

        await user.save();

        res.json({
            success:true,
            message:"Registration Successful"
        });

    }catch(error){

        res.json({
            success:false,
            message:"User already exists"
        });

    }

});


// LOGIN API
app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if(user){

        res.json({
            success:true,
            message:"Login Successful"
        });

    }else{

        res.json({
            success:false,
            message:"Invalid Credentials"
        });

    }

});


// VIEW USERS API
app.get('/users', async (req, res) => {

    const users = await User.find();

    res.json(users);

});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});