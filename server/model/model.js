const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  job_profile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: [true, 'email already present']
  },
  mobile: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

/** **********  Validates unique email  *****************/
// schema.path('email').validate(async (email) => {
//   const emailCount = await mongoose.models.user.countDocuments({ email })
//   return !emailCount
// }, 'Email already exists')

const Userdb = mongoose.model('user', schema)

module.exports = Userdb
