const Userdb = require('../model/model')
const { body, validationResult } = require('express-validator');

// create and save new user
exports.create = async (req, res, next) => {

  // new user
  const user = new Userdb({
    name: req.body.name,
    job_profile: req.body.job_profile,
    email: req.body.email,
    mobile: req.body.mobile
  })

  try {
    const errors = validationResult(req);
    // flash getting any error for displaying errors
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash('error', error.msg);
      });
      res.render('add_user', {
        name: req.body.name,
        email: req.body.email,
        mobile: body.mobile,
        messages: req.flash(),
      });
      return;
    }

    // email validation
    const { email } = req.body;
    const doesExist = await Userdb.findOne({ email });
    if (doesExist) {
      req.flash('warning', 'Email already exists in Database');
      res.render('add_user', {
        name: req.body.name,
        email: req.body.email,
        mobile: body.mobile,
        messages: req.flash(),
      });
      return;
    }

    // save user in the database
    await user.save(user);

    // for displaying  registered successfully
    req.flash(
      'success',
      `${user.name} registered successfully, you can now view user using back button`
    );

    // redirect to add_user page
    res.redirect('/add_user');
  } catch (error) {
    next(error);
  }

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id })
      })
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Error Occurred while retriving user information'
        })
      })
  }
}

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update can not be empty' })
  }

  const id = req.params.id
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error Update user information' })
    })
}


// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
      } else {
        res.send({
          message: 'User was deleted successfully!'
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}
