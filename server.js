const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 2121
const bodyParser = require('body-parser')
const { request } = require('express')
const { name } = require('ejs')
require('dotenv').config()


let  dbConnectionStr = 'mongodb://127.0.0.1:27017/Owed'
    
 mongoose.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(mongoose => {
        console.log(`Connected to Database`)
       
    }) 


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const Schema = mongoose.Schema;

const owedSchema = new Schema({
    name: {
      type: String,
      requires: true
    },
    paid: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }

  });

const Owed = mongoose.model("Task", owedSchema);

app.get("/",async (req, res) =>{
    try {
        const allNames = await Owed.find();
        console.log(allNames)
        res.render('index.ejs', {names : allNames})
      } catch (error) {
        console.log(error);
      }
      
});

app.post("/add", async (req, res) => {
    try{
    console.log(req.body)
    const newOwed = new Owed({name: req.body.name, paid: false, date: req.body.date, amount: req.body.amount});
    const insertedOwed = await newOwed.save();
    console.log(insertedOwed)
    }catch (error) {
        console.log(error);
      }
    return res.status(200).redirect('/');
});

 app.delete("/remove", async (req, res) => {
     console.log(req.body)
    const deleteOwed = await Owed.deleteOne({ name: req.body.name })
    return res.status(200).redirect('/');
 });
 

  app.put("/markPaid", async (req, res) => {
      console.log(req.body)
      const updateOwed = await Owed.updateOne(
         { name: req.body.name},
          { $set: { paid: true } }
        );
      return res.status(201).json(updateOwed);
  });

app.put("/markUnPaid", async (req, res) => {
  console.log(req.body)
  const updateOwed = await Owed.updateOne(
      { task: req.body.name },
      { $set: { paid: false } }
    );
  return res.status(201).json(updateOwed);
});


   

app.listen(PORT, () => console.log("Server is running on port " + PORT));