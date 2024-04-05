const express = require("express");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_CONNECT_URI=process.env.MONGODB_CONNECT_URI
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
server.use(cors());

server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb" }));

server.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
server.use(bodyparser.json());

const dbconnect = async () => {
  await mongoose.connect(MONGODB_CONNECT_URI);
  console.log("database connect");
};

dbconnect();

let myschma = new mongoose.Schema({
  image: { type: String },
  fname: { type: String },
  emailid: { type: String },
  fathername: { type: String },
  mothername: { type: String },
  age: { type: Number },
  gender: { type: String },
  nationality: { type: String },
  contactno: { type: Number },
  teninstitutionname: { type: String },
  tenboardname: { type: String },
  tenpassyear: { type: Number },
  tenno: { type: Number },
  twelveinstitutionname: { type: String },
  twelveboardname: { type: String },
  twelvepassyear: { type: Number },
  twelveno: { type: Number },
  bdinstitutionname: { type: String },
  bdboardname: { type: String },
  bdpassyear: { type: Number },
  bdno: { type: Number },
  mdinstitutionname: { type: String },
  mdboardname: { type: String },
  mdpassyear: { type: Number },
  mdno: { type: Number },
  skill1: { type: String },
  skill2: { type: String },
  skill3: { type: String },
  skill4: { type: String },
  skill5: { type: String },
  strengths1: { type: String },
  strengths2: { type: String },
  strengths3: { type: String },
  strengths4: { type: String },
  hobby1: { type: String },
  hobby2: { type: String },
  hobby3: { type: String },
  hobby4: { type: String },
  languageknown1: { type: String },
  languageknown2: { type: String },
  languageknown3: { type: String },
  project1name: { type: String },
  project1detail: { type: String },
  project2name: { type: String },
  project2detail: { type: String },
  credentialurl: { type: String },
  credentialid: { type: String },
  organization: { type: String },
  coursename: { type: String },
  activities1: { type: String },
  activities2: { type: String },
  activities3: { type: String },
  activities4: { type: String },
  village: { type: String },
  policestation: { type: String },
  district: { type: String },
  state: { type: String },
  pin: { type: Number },
  user_id: { type: String },
});

const dbmodel = mongoose.model("smalldatas", myschma);

server.get(`/api/getdata`, async (req, res) => {
  let getdata = req.query.ID;
  let response = await dbmodel.find({ user_id: getdata });
  res.send(response);
});

server.post(`/api`, async (req, res) => {
  let data = req.body;
  await dbmodel.create(data);
  res.send({ post: "CV Created Successful" });
});

server.patch(`/api/updatedata`, async (req, res) => {
  let data = req.body.params;
  let a = await dbmodel.findOne({ user_id: data.user_id });

  if (a != null) {
    let b = await dbmodel.updateMany(a, data);

    res.json(b);
  } else {
    res.json({ acknowledged: false });
  }
});

server.delete(`/api/deletedata`, async (req, res) => {
  let data = req.query.Id;
  let resp = await dbmodel.deleteOne({ user_id: data });

  res.json(resp);
});

server.listen(PORT, () => {
  console.log("server startes");
});
