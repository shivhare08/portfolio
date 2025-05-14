const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { type } = require('os');
const port = 1234

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

//mongoose.connect('mongodb+srv://shivhares2002:mww8frbY4dnHF92a@cluster0.gq0hu.mongodb.net/portfolio-msg')
mongoose.connect('mongodb+srv://shivhares2002:ud3aAPOe6CIe0s8b@portfoliocluster.ej35ppz.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioCluster')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connected");  
})

const userSchema = new mongoose.Schema({
    name:String,
    email : String,
    message:String
})


const userModel = mongoose.model('User_Data',userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
    //res.send("dfhj")
})


app.post('/post',async (req,res)=>{
    const {name , email , message} = req.body;
    const user = new userModel({
        name,
        email,
        message
    })

    await user.save();
    res.send("data send successfully")
})





app.listen(port,()=>{
    console.log(`server is connected at port ${port}`);
})