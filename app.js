const express = require("express");
const path = require("path");
// const cheerio = require("cheerio");
// const fetch = require("node-fetch");
const mongoose = require("mongoose");
const { Router } = require("express");
async function main() {
  await mongoose.connect("mongodb://localhost/MedTech");

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const app = express();
const port = 80;
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());
app.use(express.json());
main();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/Organ_Form.html");
});
app.get("/Hospital_req.html", function (req, res) {
  res.sendFile(__dirname + "/views/Hospital_req.html");
});

app.get("/Organ_Form.html", function (req, res) {
  res.sendFile(__dirname + "/views/Organ_Form.html");
});
app.get("/organ_donation.html", function (req, res) {
  res.sendFile(__dirname + "/views/organ_donation.html");
});

// define schema
const OrganSchema = new mongoose.Schema({
  id: String,
  fullname: String,
  phone: String,
  street: String,
  city: String,
  age: String,

  adhar: String,
  organ: String,
});

const Hos_reqSchema = new mongoose.Schema({
  id: String,
  fullname: String,

  age: String,

  adhar: String,
  organ: String
},{timestamps:true});

const Hospital_req_organ = mongoose.model("Hospitals_request", Hos_reqSchema);
app.post("/Hospital_request", (req, res) => {
  console.log(req.body)
  var Hospital_req_Data = new Hospital_req_organ(req.body);
  console.log(Hospital_req_Data);
  Hospital_req_Data.save()
    .then(() => {
      // res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("Itme not saved");
    });
});


app.get("/views/Organ_Form.html", (req, res) => {
  res.sendFile(__dirname + "/views/Organ_Form.html");
});

app.get("organ_req_table.html", (req, res) => {
  res.sendFile(__dirname + "/views/organ_req_table.html");
});

app.get("/Organ", (req, res) => {
  const params = {};
  res.status(200).render("/Organ_Form.html", params);
});

app.get("/Organ_Table.html",(req,res)=>{
  res.sendFile(__dirname+"/views/Organ_Table.html")

})



const Organ= mongoose.model("organ_donation_Form",OrganSchema  );
app.post("/Organ", (req, res) => {
  var myorganData = new Organ(req.body);
  console.log(myorganData);
  myorganData
    .save()
    .then(() => {
      // res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("Itme not saved");
    });
});

app.get("/hospital_data", async (req,res) => {
  const data = await Hospital_req_organ.find({});
  res.json(data)
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
