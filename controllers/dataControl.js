const dataControl = (app, fs) => {
  // variables
  const dataPath = "./storage/company.json";

  // READ
  app.get("/read", (req, res) => {
    const fs = require("fs");
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  //CREATE
  app.post("/create", (req, res) => {
    readFile((data) => {
      const newUserId = Object.keys(data).length + 1;

      // add the new user
      data[newUserId.toString()] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new user added");
      });
    }, true);
  });
  //DELETE
};

module.exports = dataControl;
