const axios = require("axios");


exports.home = async (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = async (req, res) => {
  res.render("add_user");
};

exports.update_user = async (req, res) => {
  axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
  .then(function(userdata){
      res.render("update_user", { user : userdata.data})
  })
  .catch(err =>{
      res.send(err);
  })
};

exports.view_user = async (req, res) => {
  axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
  .then(function(userdata){
      res.render("view_user", { user : userdata.data})
  })
  .catch(err =>{
      res.send(err);
  })
};

exports.aboutus = async (req, res) => {
  res.render("aboutme");
};
