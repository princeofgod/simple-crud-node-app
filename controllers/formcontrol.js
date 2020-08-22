module.exports = function (app) {
  const fs = require("fs");

  //datapath
  const dataPath = "./storage/company.json";

  //read file method
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  //write file method
  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  //Get method for the index
  app.get("/", function (req, res) {
    res.render("index");
  });

  //Get method for the create user page
  app.get("/create", function (req, res) {
    res.render("create");
  });

  app.post("/create", function (req, res) {
    readFile((data) => {
      const newUserId = Object.keys(data).length + 1;

      // add the new user
      data[newUserId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new user added");
      });
    }, true);
    res.render("success", { data: req.body });
  });

  app.get("/delete", function (req, res) {
    res.render("delete");
  });

  // var del = () => {
  app.post("/delete", (req, res) => {
    console.group(req.query);
    const userId = req.params["id"];
    // delete data[userId];
    // console.log(userId);
    // readFile((data) => {
    //   // add the new user
    //   // const userId = req.params["id"];
    //   // delete data[userId];

    //   writeFile(JSON.stringify(data, null, 2), () => {
    //     res.status(200).send(`users id:${userId} removed`);
    //   });
    // }, true);
    JSON.stringify();
    fs.readFile(dataPath, "utf8", function (err, data) {
      var company = JSON.parse(data);
      console.log(company);
      console.log(req.body.id);
      delete company[req.body.id];
      console.log(company);
      fs.writeFile(
        dataPath,
        JSON.stringify(company, null, 2),
        "utf8",
        function (err) {
          if (!err) console.log("Successful!");
        }
      );
    });
    res.render("success");
  });

  // };
};
