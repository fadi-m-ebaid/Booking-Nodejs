var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var usersSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: false,
      unique: false,
    },
    userPhone: {
      type: Number,
      required: false,
      unique: false
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //     validator: function (emailValue) {
      //         return /^[a-zA-Z0-9._%+-]{3,20}(@)(gmail|yahoo|outlook)(.com)$/.test(emailValue);
      //     },
      //     message: props => {
      //         console.log(props);
      //         return `${props.value} is not a valid email !`
      //     }
      // }
    },
    userAddress: {
      type: String,
      required: false
    },
    dob: {
      type: Date,
    },
    isActive:
    {
      type: Boolean,
      default: true
    },
    userImg: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png"
    },
  },

  // roleId: {
  //     type: mongoose.SchemaType.ObjectId,
  //     required: true,
  //     unique: true,
  //     ref: 'role'
  // }

  { timestamps: true }
);

usersSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.userPassword, salt);
  this.userPassword = hashedPassword;
  next();
});

var usersModel = mongoose.model('users', usersSchema);
module.exports = usersModel;
