const express = require("express");
const dataControl = require("./controllers/dataControl");
const formcontrol = require("./controllers/formcontrol");
const app = express();

//Setting view engine
app.set("view engine", "ejs");

app.use(express.static("./public"));
// app.use("/company", companyCrud);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

formcontrol(app);
dataControl(app);

app.listen(3000, "localhost");
console.log("Server istening on port 3000");
