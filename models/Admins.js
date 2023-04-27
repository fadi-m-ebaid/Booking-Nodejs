var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var adminsSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    adminPassword: {
      type: String,
      required: false,
      unique: false,
    },
    adminPhone: {
        type: Number,
       required: false,
        unique: false
    },
    adminEmail: {
        type: String,
        required: false,
        unique: false,
        validate: {
            validator: function (emailValue) {
                return /^[a-zA-Z0-9._%+-]{3,20}(@)(gmail|yahoo|outlook)(.com)$/.test(emailValue);
            },
            message: props => {
                console.log(props);
                return `${props.value} is not a valid email !`
            }
        }
    },
    
    adminAddress: {
        type: String,
       required: false
    },
    
    dob: {
        type: Date,
        required: false
    }
    // roleId: {
    //     type: mongoose.SchemaType.ObjectId,
    //     required: false,
    //     unique: false,
    //     ref: 'role'
    // }
  },
  { timestamps: false }
);

adminsSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.adminPassword, salt);
  this.adminPassword = hashedPassword;
  next();
});

var adminsModel = mongoose.model('admins', adminsSchema);
module.exports = adminsModel;
